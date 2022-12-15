package com.example.routes

import com.example.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.update
import java.io.File
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import kotlin.random.Random

@Suppress("UNCHECKED_CAST")
fun Route.configureBranchesRoutes() {
    get("all") {
        // Call Google API
        val response = client.post("https://www.googleapis.com/geolocation/v1/geolocate?key=$API_KEY")
        val (lat, long) = if (response.status == HttpStatusCode.OK) {
            val geolocation: GeolocationResponse = Json.decodeFromString(response.bodyAsText())

            geolocation.location.lat to geolocation.location.lng
        } else null to null


        val branches = Branch.selectAll().let { branches ->
            if (lat != null && long != null) branches.sortedBy { branch ->
                distanceInM(branch.latitude, branch.longitude, lat, long).also { branch.distance = it }
            } else branches
        }

        call.respond(branches)
    }

    get("days/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()
        if (id == null) {
            call.respondText("Invalid branch ID", status = HttpStatusCode.BadRequest)
            return@get
        }

        val days = Timeslot.select(id).distinctBy { it.dayOfYear }.map { it.toLocalDate().toString() }
        call.respond(days)
    }

    get("timeslots/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()
        if (id == null) {
            call.respondText("Invalid branch ID", status = HttpStatusCode.BadRequest)
            return@get
        }
        val date = try {
            LocalDate.parse(call.request.queryParameters["date"])
        } catch (e: Exception) {
            call.respondText("Invalid date", status = HttpStatusCode.BadRequest)
            return@get
        }

        val timeslots = Timeslot.select(id).filter { it.toLocalDate().equals(date) }.map { it.toLocalTime().toString() }
        call.respond(timeslots)
    }

    post("submit") {
        val body = try {
            call.receive<Appointment>()
        } catch (e: Exception) {
            e.printStackTrace()
            call.respondText("Invalid data format", status = HttpStatusCode.BadRequest)
            return@post
        }

        val emailRegex = Regex("""\S+@\S+""")
        val phoneRegex = Regex("""\+?\d{10,14}""")
        val cnpRegex = Regex("""\d{13}""")

        if (
            body.actions.length >= 200 ||
            body.branchID < 0 ||
            body.name.length >= 50 ||
            body.surname.length >= 50 ||
            !body.cnp.matches(cnpRegex) ||
            !body.email.matches(emailRegex) ||
            !body.phone.matches(phoneRegex)
        ) {
            call.respondText("Invalid data lengths", status = HttpStatusCode.BadRequest)
            return@post
        }

        val charPool: List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')
        val randomKey = buildString {
            repeat(15) {
                append(charPool[Random.nextInt(charPool.size)])
            }
        }

        val (to, email, branch) = try {
            val branch = Branch.select(body.branchID)

            val dateTime = LocalDateTime.of(
                LocalDate.parse(body.date),
                LocalTime.parse(body.time),
            )
            dbQuery {
                Appointments.insert {
                    it[actions] = body.actions
                    it[branchID] = body.branchID
                    it[datetime] = dateTime
                    it[name] = body.name
                    it[surname] = body.surname
                    it[cnp] = body.cnp
                    it[email] = body.email
                    it[phone] = body.phone
                    it[cancelKey] = randomKey
                }
                BranchesTimeslots.update({
                    BranchesTimeslots.branch eq body.branchID and (BranchesTimeslots.datetime eq dateTime)
                }) {
                    it[occupied] = true
                }
            }

            // Create email
            Triple(
                body.email, Email(
                    body.name,
                    branch.name,
                    body.actions.split('|').joinToString(),
                    dateTime.toString(),
                    branch.address,
                    "https://maps.google.com/maps?q=${branch.latitude}%2C${branch.longitude}",
                    "mid",
                    "http://localhost/email/cancelAppointment?key=" + randomKey,
                ), branch
            )
        } catch (e: Exception) {
            e.printStackTrace()
            call.respondText("Invalid data", status = HttpStatusCode.BadRequest)
            return@post
        }

        // Generate map image
        val response = client.get(
            """https://maps.googleapis.com/maps/api/staticmap?
               size=640x400&
               center=${branch.latitude}%2C${branch.longitude}&
               zoom=15&
               maptype=roadmap&
               markers=color:blue%7C${branch.latitude}%2C${branch.longitude}&
               key=$API_KEY""".trimIndent()
        )

        // Send mail
        if (response.status == HttpStatusCode.OK) {
            val bytes = response.bodyAsChannel().toByteArray()
            File("map.png").writeBytes(bytes)
            sendMail(to, bytes, email)
        } else sendMail(to, null, email)

        call.respondText("Success", status = HttpStatusCode.OK)
    }
}