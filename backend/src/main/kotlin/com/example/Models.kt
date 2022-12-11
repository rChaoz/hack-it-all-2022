package com.example

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.select

@Serializable
data class Branch(
    val county: String,
    val city: String,
    val name: String,
    val address: String,
    val operations: String,
    val latitude: Double,
    val longitude: Double,
    val phoneNumber: String,
    val phoneHours: String,
) {
    companion object {
        private fun rowToBranch(row: ResultRow) = with(Branches) {
            Branch(
                row[county],
                row[city],
                row[name],
                row[address],
                row[operations],
                row[latitude],
                row[longitude],
                row[phoneNumber],
                row[phoneHours],
            )
        }

        suspend fun selectAll() = dbQuery { Branches.select { Branches.available eq true }.map(Branch::rowToBranch) }
    }
}

@Serializable
data class Appointment(
    val name: String,
    val branch: String,
    val purpose: String,
    val dateAndTime: String,
    val address: String,
    val calendarLink: String,
    val cancelAppointment: String,
)