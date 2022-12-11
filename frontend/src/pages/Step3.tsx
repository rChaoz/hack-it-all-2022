import {Center, Flex, Space, Text, Title} from "@mantine/core";
import {Calendar} from '@mantine/dates';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {StepContext} from "./Step";
import LoadingData from "../components/LoadingData";
import RadioButton from "../components/RadioButton";

interface Step3Props {
}

export function Step3({}: Step3Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(3), [])

    const [date, setDate] = useState(context.stepsData.date)
    const [time, setTime] = useState(context.stepsData.time)
    context.stepsData.validate = () => date != null && time != null

    const resolveDay = useMemo(() => loadDays(context.stepsData.branchID!), [context.stepsData.branchID])
    const [resolveTime, setResolveTime] = useState(date != null ? loadTimeslots(context.stepsData.branchID!, date) : null)

    return (<>
        <Title order={2} align={"center"}>În ce zi ne vizitezi?</Title>
        <Text pb={"md"}>Alege data și intervalul orar pentru vizita la BCR-NumeUnitate</Text>

        <LoadingData resolve={resolveDay}>
            {(daysIn: string[]) => {
                const days = daysIn.map(day => new Date(Date.parse(day)).toDateString())
                console.log(days)
                return <Center>
                    <Calendar excludeDate={date => {
                        console.log(date.toDateString())
                        return !days.includes(date.toDateString())
                    }} onChange={(value) => {
                        context.stepsData.date = value!
                        setDate(value!)
                        setTime(undefined)
                        setResolveTime(loadTimeslots(context.stepsData.branchID!, value!))
                    }} value={date}/>
                </Center>
            }}
        </LoadingData>
        <Space h={"md"}/>
        {resolveTime == null ? null :
            <LoadingData resolve={resolveTime}>
                {(timeslots: string[]) => (
                    <Flex gap="xs" align="stretch" direction="column" mx={context.smallScreen ? 0 : 100}>
                        {timeslots.map(timeslot => <RadioButton name={timeslot} checked={time} onChange={(time: string) => {
                            setTime(time)
                            context.stepsData.time = time
                        }
                        }>{timeslot}</RadioButton>)}
                    </Flex>
                )}
            </LoadingData>}
    </>)
}

async function loadDays(branchID: number) {
    return (await fetch("http://localhost:8080/api/days/" + branchID)).json()
}

async function loadTimeslots(branchID: number, date: Date) {
    return (await fetch(`http://localhost:8080/api/timeslots/${branchID}?date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)).json()
}