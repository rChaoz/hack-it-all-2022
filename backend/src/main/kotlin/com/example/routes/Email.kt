package com.example.routes

import com.example.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.update


fun Route.configureEmailRoutes() {
    get("/cancelAppointment") {
        val key = call.request.queryParameters["key"]
        if (key == null) {
            call.respondText("Forbidden", status = HttpStatusCode.Forbidden)
            return@get
        } else if (key.length != 15) {
            call.respondText("Invalid key", status = HttpStatusCode.BadRequest)
            return@get
        }
        val row = dbQuery {
            Appointments.select { Appointments.cancelKey eq key }.singleOrNull()
        }
        if (row == null) {
            call.respondText("Invalid key", status = HttpStatusCode.BadRequest)
            return@get
        }
        val branch = row[Appointments.branchID]
        val datetime = row[Appointments.datetime]
        dbQuery {
            Appointments.deleteWhere { cancelKey eq key }
            BranchesTimeslots.update({
                BranchesTimeslots.branch eq branch and (BranchesTimeslots.datetime eq datetime)
            }) {
                it[occupied] = false
            }
        }

        call.respondRedirect("http://localhost:3000/delete")
    }
}