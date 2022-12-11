package com.example.plugins

import com.example.Email
import com.example.routes.configureBranchesRoutes
import com.example.routes.configureEmailRoutes
import com.example.sendMail
import io.ktor.server.application.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(AutoHeadResponse)

    routing {
        route("/api") {
            configureBranchesRoutes()
        }
        route("/email") {
            configureEmailRoutes()
        }
    }
}
