package com.example
import com.example.plugins.*
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.*
import net.axay.simplekotlinmail.data.SMTPLoginInfo
import net.axay.simplekotlinmail.delivery.MailerManager
import net.axay.simplekotlinmail.delivery.mailerBuilder
import org.simplejavamail.api.mailer.config.TransportStrategy

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
        API_KEY = Class.forName("com.example.ApiKey").getDeclaredMethod("getApiKey").invoke(null) as String
    } catch (e: Exception) {
        println("[WARN] Api Key not set. Google APIs will not work.")
    }
    var loginInfo = SMTPLoginInfo("smtp.freesmtpservers.com", 25, null, null)
    try {
        loginInfo = Class.forName("com.example.ApiKey").getDeclaredMethod("getSmtpCredentials").invoke(null) as SMTPLoginInfo
    } catch (e: Exception) {
        println("[WARN] Login info not set. Email will be sent using backup server (\"smtp.freesmtpservers.com\")")
    }
    @Suppress("DEPRECATION")
    install(CORS) {
        anyHost()
        allowHeader("Content-Type")
    }
    configureSerialization()
    configureRouting()

    MailerManager.defaultMailer = mailerBuilder(loginInfo) {
        if (loginInfo.host != "smtp.freesmtpservers.com") withTransportStrategy(TransportStrategy.SMTPS)
    }
}
