package com.example

import freemarker.template.Configuration
import freemarker.template.TemplateExceptionHandler
import freemarker.template.Version
import net.axay.simplekotlinmail.delivery.send
import net.axay.simplekotlinmail.email.emailBuilder
import java.io.StringWriter
import java.util.*


private val cfg = Configuration(Version(2, 3, 20)).apply {
    setClassForTemplateLoading(object {}.javaClass, "/templates")
    defaultEncoding = "UTF-8"
    locale = Locale.ENGLISH
    templateExceptionHandler = TemplateExceptionHandler.RETHROW_HANDLER
}

suspend fun sendMail(to: String, mapImg: ByteArray?, data: Email) {
    val c = object {}.javaClass

    emailBuilder {
        from("no-reply@bcrfake.ro")
        to(to)

        withSubject("Programarea ta la BCR")
        val writer = StringWriter()
        cfg.getTemplate("email.ftl").process(mapOf("data" to data), writer)
        withHTMLText(writer.toString())
        withEmbeddedImage("logo", c.getResourceAsStream("/templates/logo.png").use { it!!.readAllBytes() }, "image/png")
        if (mapImg != null) withAttachment("map", mapImg, "image/png")
        withEmbeddedImage("programare", c.getResourceAsStream("/templates/programare.png").use { it!!.readAllBytes() }, "image/png")
    }.send()
}