package com.example.routes

import com.example.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

@Suppress("UNCHECKED_CAST")
fun Route.configureBranchesRoutes() {
    get("/all") {
        // Call Google API
        val response = client.post("https://www.googleapis.com/geolocation/v1/geolocate?key=$API_KEY")
        val geolocation: GeolocationResponse = Json.decodeFromString(response.bodyAsText())

        val lat = geolocation.location.lat
        val long = geolocation.location.lng

        val branches = Branch.selectAll().sortedBy { branch ->
            distanceInM(branch.latitude, branch.longitude, lat, long).also { branch.distance = it }
        }.take(50)

        call.respond(branches)
    }
}