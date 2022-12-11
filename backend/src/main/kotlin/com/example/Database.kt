package com.example

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

object Database {
    fun init(create: Boolean = true) {
        Database.connect("jdbc:h2:file:./build/db", "org.h2.Driver")
        if (create) transaction {
            SchemaUtils.create(Branches)
            SchemaUtils.create(BranchesTimeslots)
        }
    }

    fun reset() {
        transaction {
            SchemaUtils.drop(BranchesTimeslots)
            SchemaUtils.drop(Branches)
            SchemaUtils.create(Branches)
            SchemaUtils.create(BranchesTimeslots)
        }
    }
}

private val coroutineScope = CoroutineScope(Dispatchers.IO)

suspend fun <T> dbQuery(block: suspend () -> T): T = newSuspendedTransaction(Dispatchers.IO) { block() }

fun <T> asyncQuery(block: suspend () -> Unit) = coroutineScope.launch { block() }

object Branches : IntIdTable() {
    val county = varchar("county", 50)
    val city = varchar("city", 50)
    val name = varchar("name", 50)
    val address = varchar("address", 200)
    val operations = varchar("operations", 200)
    val latitude = double("latitude")
    val longitude = double("longitude")
    val hoursWeekday = varchar("hoursWeekday", 100)
    val hoursSaturday = varchar("hoursSaturday", 100)
    val hoursSunday = varchar("hoursSunday", 100)
    val phoneNumber = varchar("phoneNumber", 50)
    val phoneHours = varchar("phoneHours", 50)
    val available = bool("available")
}

object BranchesTimeslots : IntIdTable() {
    val branch = integer("branch").references(Branches.id)
    val datetime = datetime("datetime")
    val occupied = bool("occupied").default(false)
}