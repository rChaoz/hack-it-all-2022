package com.example

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import java.time.DayOfWeek
import java.time.LocalDate

@Serializable
data class Branch(
    val county: String,
    val city: String,
    val name: String,
    val address: String,
    val operations: String,
    val latitude: Double,
    val longitude: Double,
    val hours: String,
    val phoneNumber: String,
    val phoneHours: String,
    var distance: Double = 0.0,
) {
    companion object {
        private fun rowToBranch(row: ResultRow) = with(Branches) {
            val dayOfWeek = LocalDate.now().dayOfWeek
            Branch(
                row[county],
                row[city],
                row[name],
                row[address],
                row[operations],
                row[latitude],
                row[longitude],
                when (dayOfWeek) {
                    DayOfWeek.SATURDAY -> row[hoursSaturday]
                    DayOfWeek.SUNDAY -> row[hoursSunday]
                    else -> row[hoursWeekday]
                },
                row[phoneNumber],
                row[phoneHours],
            )
        }

        suspend fun selectAll() = dbQuery { Branches.select { Branches.available eq true }.map(Branch::rowToBranch) }
    }
}

class Timeslot {
    companion object {
        private fun rowToTimeslot(row: ResultRow) = row[BranchesTimeslots.datetime]

        suspend fun select(branch: Int) = dbQuery {
            BranchesTimeslots.select { BranchesTimeslots.branch eq branch and (BranchesTimeslots.occupied eq false) }.map(Timeslot::rowToTimeslot)
        }
    }
}

@Serializable
data class Appointment(
    val name: String,
    val branch: String,
    val purpose: String,
    val dateAndTime: String,
    val address: String,
    val navigateLink: String,
    val calendarLink: String,
    val cancelAppointment: String,
)

@Serializable
data class GeolocationResponse(val location: Location, val accuracy: Double) {
    @Serializable
    data class Location(val lat: Double, val lng: Double)
}