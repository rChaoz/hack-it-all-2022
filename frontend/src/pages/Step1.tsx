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
            <RadioButton name={"plata_rata_credit"} checked={checked} onChange={setChecked}>Plata rata credit</RadioButton>
            <RadioButton name={"operatiune_fara_numerar"} checked={checked} onChange={setChecked}>Operatiune fara numerar</RadioButton>
            <RadioButton name={"deschidere_cont_curent"} checked={checked} onChange={setChecked}>Deschidere cont curent</RadioButton>
            <RadioButton name={"deschidere_cont_minori"} checked={checked} onChange={setChecked}>Deschidere cont minori</RadioButton>
            <RadioButton name={"deschidere_cont_refugiati"} checked={checked} onChange={setChecked}>Deschidere conturi refugiati</RadioButton>
            <RadioButton name={"suport_aplicatie"} checked={checked} onChange={setChecked}>Suport utilizare aplicatie George</RadioButton>
            <RadioButton name={"diagnostic_financiar"} checked={checked} onChange={setChecked}>Diagnostic financiar gratuit</RadioButton>
            <RadioButton name={"credit_nevoi"} checked={checked} onChange={setChecked}>Credit de nevoi personale</RadioButton>
            <RadioButton name={"credit_ipotecar"} checked={checked} onChange={setChecked}>Credit ipotecar</RadioButton>
            <RadioButton name={"economisire"} checked={checked} onChange={setChecked}>Economisire</RadioButton>
            <RadioButton name={"contracte_bpl"} checked={checked} onChange={setChecked}>Contracte BpL</RadioButton>
            <RadioButton name={"investitii_subscriere"} checked={checked} onChange={setChecked}>Investitii - subscriere</RadioButton>
            <RadioButton name={"investitii_rascumparare"} checked={checked} onChange={setChecked}>Investitii - rascumparare</RadioButton>
            <RadioButton name={"asigurare"} checked={checked} onChange={setChecked}>Asigurare</RadioButton>
            <RadioButton name={"pensie"} checked={checked} onChange={setChecked}>Pensie privata</RadioButton>
        </Flex>
    </>)
}