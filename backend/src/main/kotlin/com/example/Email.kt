package com.example

import freemarker.template.Configuration
import freemarker.template.TemplateExceptionHandler
import freemarker.template.Version
import net.axay.simplekotlinmail.delivery.send
import net.axay.simplekotlinmail.email.emailBuilder
import java.io.File
import java.io.StringWriter
import java.util.*


private val cfg = Configuration().apply {
    setClassForTemplateLoading(object {}.javaClass, "/templates")
    incompatibleImprovements = Version(2, 3, 20)
    defaultEncoding = "UTF-8"
    locale = Locale.ENGLISH
    templateExceptionHandler = TemplateExceptionHandler.RETHROW_HANDLER
}

suspend fun sendMail(to: String, mapImg: ByteArray, data: Email) {
    val c = object {}.javaClass

    val mail = emailBuilder {
        from("no-reply@george.bcrfake.ro")
        to(to)

        withSubject("Programarea ta la BCR")
        val writer = StringWriter()
        cfg.getTemplate("email.ftl").process(mapOf("data" to data), writer)
        withHTMLText(writer.toString())
        withAttachment("logo.png", c.getResourceAsStream("/templates/logo.png")!!.use { it.readAllBytes() }, "image/png")
        withAttachment("map.png", c.getResourceAsStream("/templates/map.png")!!.use { it.readAllBytes() }, "image/png")
        withAttachment("programare.png", c.getResourceAsStream("/templates/programare.png")!!.use { it.readAllBytes() }, "image/png")
    }

    mail.send()
    File("mail.html").writeText(mail.htmlText!!)
}