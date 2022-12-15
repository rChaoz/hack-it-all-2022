package com.example
import com.example.plugins.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.*
import net.axay.simplekotlinmail.delivery.MailerManager
import net.axay.simplekotlinmail.delivery.mailerBuilder

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

var API_KEY = ""

val client = HttpClient(CIO) {
    defaultRequest {
        contentType(ContentType.Application.Json)
        accept(ContentType.Application.Json)
    }
}

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    Database.init()
    try {
        API_KEY = Class.forName("com.example.ApiKey").getDeclaredMethod("getPrivateKey").invoke(null) as String
        println("It worked! " + API_KEY)
    } catch (e: Exception) {
        println("[WARN] Api Key not set. Google APIs will not work.")
    }
    @Suppress("DEPRECATION")
    install(CORS) {
        anyHost()
        allowHeader("Content-Type")
    }
    configureSerialization()
    configureRouting()

    MailerManager.defaultMailer = mailerBuilder("smtp.freesmtpservers.com", 25)
}
