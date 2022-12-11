import {Center, Text, Title} from "@mantine/core";
import {Calendar} from '@mantine/dates';
import {useContext, useEffect, useMemo, useState} from "react";
import {StepContext} from "./Step";
import LoadingData from "../components/LoadingData";

interface Step3Props {
}

export function Step3({}: Step3Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(3), [])

    const now = new Date()
    const max = new Date()
    max.setDate(max.getDate() + 30)

    const [date, setDate] = useState<Date>()
    context.stepsData.validate = () => date != null

    const resolve = useMemo(() => loadDays(context.stepsData.branchID!), [context.stepsData.branchID])
    return (<>
        <Title order={2} align={"center"}>În ce zi ne vizitezi?</Title>
        <Text pb={"md"}>Alege data și intervalul orar pentru vizita la BCR-NumeUnitate</Text>

        <LoadingData resolve={resolve}>
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
                    }} value={date}/>
                </Center>
            }}
        </LoadingData>

    </>)
}

async function loadDays(branchID: number) {
    return (await fetch("http://localhost:8080/api/days/" + branchID)).json()
}