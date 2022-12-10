import {Text, Title} from "@mantine/core";
import {DatePicker} from '@mantine/dates';
import {useContext, useEffect} from "react";
import {StepContext} from "./Step";

interface Step3Props {
}

export function Step3({}: Step3Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(3), [])

    const now = new Date()
    const max = new Date()
    max.setDate(max.getDate() + 30)

    return (<>
        <Title order={2} align={"center"}>În ce zi ne vizitezi?</Title>
        <Text pb={"md"}>Alege data și intervalul orar pentru vizita la BCR-NumeUnitate</Text>
        <DatePicker placeholder="Alege o data" label="Alege data" withAsterisk minDate={now} maxDate={max} excludeDate={date => {
            const day = date.getDay()
            return day === 0 || day === 6;
            // todo restu
        }}/>
    </>)
}