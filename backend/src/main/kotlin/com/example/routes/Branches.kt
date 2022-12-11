package com.example.routes

import com.example.Branch
import com.example.distanceInKm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

@Suppress("UNCHECKED_CAST")
fun Route.configureBranchesRoutes() {
    get("/all") {
        val latLong = call.request.queryParameters["location"]?.split(',')?.map(String::toDoubleOrNull)
        if (latLong == null || latLong.size != 2 || latLong.any { it == null }) {
            call.respondText("Invalid location", status = HttpStatusCode.BadRequest)
            return@get
        }
        val (lat, long) = latLong as List<Double>
        if (lat !in -90.0..90.0 || long !in -180.0..180.0) {
            call.respondText("Invalid location", status = HttpStatusCode.BadRequest)
            return@get
        }

        val branches = Branch.selectAll().sortedBy { branch ->
            distanceInKm(branch.latitude, branch.longitude, lat, long)
        }

        call.respond(branches)
    }
}