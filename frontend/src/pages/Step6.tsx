import {Text, Title} from "@mantine/core";
import {useContext, useEffect} from "react";
import {StepContext} from "./Step";

interface Step6Props {
}

export function Step6({}: Step6Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(6), [])

    return (<>
        <Title order={2} align={"center"}>Sumarul programării:</Title>
        <Text>NUME, confirmă dacă datele de mai jos sunt corecte.</Text>
    </>)
}





