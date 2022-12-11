package com.example

import freemarker.template.Configuration
import freemarker.template.TemplateExceptionHandler
import freemarker.template.Version
import net.axay.simplekotlinmail.delivery.send
import net.axay.simplekotlinmail.email.emailBuilder
import java.io.StringWriter
import java.util.*


private val cfg = Configuration().apply {
    setClassForTemplateLoading(object {}.javaClass, "/templates")
    incompatibleImprovements = Version(2, 3, 20)
    defaultEncoding = "UTF-8"
    locale = Locale.ENGLISH
    templateExceptionHandler = TemplateExceptionHandler.RETHROW_HANDLER
}

suspend fun sendMail(to: String, data: Email) {
    val c = object {}.javaClass

    emailBuilder {
        from("no-reply@george.bcrfake.ro")
        to(to)

        withSubject("Programarea ta la BCR")
        val writer = StringWriter()
        cfg.getTemplate("email.ftl").process(mapOf("data" to data), writer)
        withPlainText(writer.toString())
        withAttachment("logo", c.getResourceAsStream("/templates/logo.png")!!.use { it.readAllBytes() }, "image/png")
        withAttachment("map", c.getResourceAsStream("/templates/map.png")!!.use { it.readAllBytes() }, "image/png")
        withAttachment("placeholder", c.getResourceAsStream("/templates/programare.png")!!.use { it.readAllBytes() }, "image/png")
    }.send()
}