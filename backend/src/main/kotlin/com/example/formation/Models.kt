package com.example.formation

import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import java.time.LocalTime


@Suppress("UNNECESSARY_LATEINIT", "CanBeParameter")
@Serializable
class InputBranch private constructor(private val br: Branch) {
    @Transient val county = br.brl.ad.jud
    @Transient val city = br.brl.ad.loc
    @Transient val name = br.brn
    @Transient val address = br.brl.ad.str
    @Transient val operations = br.op
    @Transient val latitude = br.brl.lat
    @Transient val longitude = br.brl.long
    @Transient val hoursWeekdayString = br.av.mf
    @Transient val hoursSaturdayString = br.av.sat
    @Transient val hoursSundayString = br.av.sun
    @Transient lateinit var hoursWeekday: List<LocalTime>
    @Transient lateinit var hoursSaturday: List<LocalTime>
    @Transient lateinit var hoursSunday: List<LocalTime>
    @Transient val phoneNumber = arrayOf(
        br.telefon1, br.telefon2, br.telefon3, br.telefon4, br.telefon5
    ).filter { !it.isNullOrBlank() }.joinToString()
    @Transient val phoneHours = "9:00 - 16:30"
    @Transient var available = true

    init {
        val timeRangeRegex = Regex("""(\d\d:\d\d) ?- ?(\d\d:\d\d)""")
        val processTimeRange = { string: String ->
            timeRangeRegex.findAll(string).flatMap { result ->
                val (from, to) = result.groupValues.slice(1..2).map(LocalTime::parse)
                buildList {
                    var current = from
                    while (current < to) {
                        add(current)
                        current = current.plusMinutes(15)
                    }
                }
            }.toList()
        }

        hoursWeekday = processTimeRange(br.av.mf)
        hoursSaturday = processTimeRange(br.av.sat)
        hoursSunday = processTimeRange(br.av.sun)

        if (hoursWeekday.isEmpty() && hoursSaturday.isEmpty() && hoursSunday.isEmpty()) available = false
    }

    @Serializable
    class Branch(
        val brn: String,
        val telefon1: String? = null,
        val telefon2: String? = null,
        val telefon3: String? = null,
        val telefon4: String? = null,
        val telefon5: String? = null,
        val op: String,
        val brl: Brl,
        val av: Av,
    ) {
        @Serializable
        class Brl(
            val lat: Double,
            val long: Double,
            val ad: Ad,
        ) {
            @Serializable
            class Ad(
                val str: String,
                val loc: String,
                val jud: String,
            )
        }

        @Serializable
        class Av(
            val mf: String,
            val sat: String,
            val sun: String,
        )
    }
}