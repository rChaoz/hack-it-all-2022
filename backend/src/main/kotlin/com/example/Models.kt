package com.example

data class Appointment(
    val name: String,
    val branch: String,
    val purpose: String,
    val dateAndTime: String,
    val address: String,
    val calendarLink: String,
    val cancelAppointment: String,
)