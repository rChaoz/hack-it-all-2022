import {Flex, Text, Title} from "@mantine/core";
import React, {useContext, useEffect, useState} from "react";
import {StepContext} from "./Step";
import RadioButton from "../components/RadioButton";

interface Step1Props {
}

export function Step1({}: Step1Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(1), [context])

    const [checked, setChecked] = useState<string>()

    return (<>
        <Title order={2} align={"center"}>Despre ce vrei sa vorbim?</Title>
        <Text align={"center"} pb={"md"}>Alege un motiv pentru care programezi vizita in unitate:</Text>
        <Flex gap="xs" align="stretch" direction="column" mx={context.smallScreen ? 0 : 100}>
            <RadioButton name={"depunere_retragere"} checked={checked} onChange={setChecked}>Depunere sau retragere de bani</RadioButton>
            <RadioButton>Plata rata credit</RadioButton>
            <RadioButton>Operatiune fara numerar</RadioButton>
            <RadioButton>Deschidere cont curent</RadioButton>
            <RadioButton>Deschidere cont minori</RadioButton>
            <RadioButton>Deschidere conturi refugiati</RadioButton>
            <RadioButton>Suport utilizare aplicatie George</RadioButton>
            <RadioButton>Diagnostic financiar gratuit</RadioButton>
            <RadioButton>Credit de nevoi personale</RadioButton>
            <RadioButton>Credit ipotecar</RadioButton>
            <RadioButton>Economisire</RadioButton>
            <RadioButton>Contracte BpL</RadioButton>
            <RadioButton>Investitii - subscriere</RadioButton>
            <RadioButton>Investitii - rascumparare</RadioButton>
            <RadioButton>Asigurare</RadioButton>
            <RadioButton>Pensie privata</RadioButton>
        </Flex>
    </>)
}