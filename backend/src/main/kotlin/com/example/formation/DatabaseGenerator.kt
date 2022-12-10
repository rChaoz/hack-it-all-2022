package com.example.formation

import Branches
import BranchesTimeslots
import Database
import dbQuery
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.decodeFromStream
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.insertAndGetId
import java.io.File
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

private val json = Json { ignoreUnknownKeys = true }

@OptIn(ExperimentalSerializationApi::class)
suspend fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("Program requires argument")
        return
    }
    val file = File(args[0])
    if (!file.exists()) {
        println("File '${file.absolutePath}' does not exist")
        return
    }

    val branches = json.decodeFromStream<List<InputBranch>>(file.inputStream())
    Database.init(false)
    Database.reset()
    dbQuery {
        for (branch in branches) {
            val branchID = Branches.insertAndGetId {
                it[county] = branch.county
                it[city] = branch.city
                it[name] = branch.name
                it[address] = branch.address
                it[operations] = branch.operations
                it[latitude] = branch.latitude
                it[longitude] = branch.longitude
                it[phoneNumber] = branch.phoneNumber
                it[phoneHours] = branch.phoneHours
            }.value

            fun insertTimeslots(day: LocalDate, times: List<LocalTime>) {
                for (time in times) {
                    BranchesTimeslots.insert {
                        it[BranchesTimeslots.branch] = branchID
                        it[datetime] = LocalDateTime.of(day, time)
                    }
                }
            }

            var current = LocalDate.now()
            val end = current.plusDays(30)
            while (current < end) {
                when (current.dayOfWeek) {
                    DayOfWeek.SATURDAY -> insertTimeslots(current, branch.hoursSaturday)
                    DayOfWeek.SUNDAY -> insertTimeslots(current, branch.hoursSunday)
                    else -> insertTimeslots(current, branch.hoursWeekday)
                }
                current = current.plusDays(1)
            }
        }
    }
}