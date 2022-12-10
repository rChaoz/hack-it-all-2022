import {Button, Flex, Text, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {StepContext} from "./Step";

interface Step1Props {
}

export function Step1({}: Step1Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(1), [])

    return (<>
        <Title order={2} align={"center"}>Despre ce vrei sa vorbim?</Title>
        <Text align={"center"} pb={"md"}>Alege un motiv pentru care programezi vizita in unitate:</Text>
        <Flex gap="xs" align="stretch" direction="column" mx={context.smallScreen ? 0 : 100}>
            <Button variant={"outline"}>Depunere sau retragere de bani</Button>
            <Button variant={"outline"}>Plata rata credit</Button>
            <Button variant={"outline"}>Operatiune fara numerar</Button>
            <Button variant={"outline"}>Deschidere cont curent</Button>
            <Button variant={"outline"}>Deschidere cont minori</Button>
            <Button variant={"outline"}>Deschidere conturi refugiati</Button>
            <Button variant={"outline"}>Suport utilizare aplicatie George</Button>
            <Button variant={"outline"}>Diagnostic financiar gratuit</Button>
            <Button variant={"outline"}>Credit de nevoi personale</Button>
            <Button variant={"outline"}>Credit ipotecar</Button>
            <Button variant={"outline"}>Economisire</Button>
            <Button variant={"outline"}>Contracte BpL</Button>
            <Button variant={"outline"}>Investitii - subscriere</Button>
            <Button variant={"outline"}>Investitii - rascumparare</Button>
            <Button variant={"outline"}>Asigurare</Button>
            <Button variant={"outline"}>Pensie privata</Button>
        </Flex>
    </>)
}