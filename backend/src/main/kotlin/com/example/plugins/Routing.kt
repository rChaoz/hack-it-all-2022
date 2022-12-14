package com.example.plugins

import com.example.routes.configureBranchesRoutes
import com.example.routes.configureEmailRoutes
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(AutoHeadResponse)

    routing {
        singlePageApplication {
            react("react-app")
        }
        route("/api") {
            configureBranchesRoutes()
        }
        route("/email") {
            configureEmailRoutes()
        }
    }
}
