import {Text, Title} from "@mantine/core";
import {DatePicker} from '@mantine/dates';
import {useContext, useEffect} from "react";
import {StepContext} from "./Step";

interface Step3Props {
}

export function Step3({}: Step3Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(3), [])

    return (<>
        <Title order={2} align={"center"}>În ce zi ne vizitezi?</Title>
        <Text pb={"md"}>Alege data și intervalul orar pentru vizita la BCR-NumeUnitate</Text>
        <DatePicker placeholder="Alege o data" label="Alege data" withAsterisk/>
    </>)
}