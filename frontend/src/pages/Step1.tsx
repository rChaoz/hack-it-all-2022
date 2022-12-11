import {Flex, Text, Title} from "@mantine/core";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {StepContext} from "./Step";
import RadioButton from "../components/RadioButton";

interface Step1Props {
}

export function Step1({}: Step1Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(1), [context])

    const [valid, setValid] = useState(false)

    context.stepsData.validate = useCallback(() => valid, [valid])

    const [checked, setChecked] = useState<string>()
    const onChangeHandler = (button: string) => {
        setChecked(button)
        context.stepsData.action = button
        setValid(true)
    }

    // useEffect(() => {
    //     fetch('https://www.googleapis.com/geolocat', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: null,
    //     }).then(result => {
    //         result.json().then(json => {
    //             console.log(JSON.stringify(json))
    //         })
    //     })
    // }, [])

    return (<>
        <Title order={2} align={"center"}>Despre ce vrei sa vorbim?</Title>
        <Text align={"center"} pb={"md"}>Alege un motiv pentru care programezi vizita in unitate:</Text>
        <Flex gap="xs" align="stretch" direction="column" mx={context.smallScreen ? 0 : 100}>
            <RadioButton name={"depunere_retragere"} checked={checked} onChange={onChangeHandler}>Depunere sau retragere de bani</RadioButton>
            <RadioButton name={"plata_rata_credit"} checked={checked} onChange={onChangeHandler}>Plata rata credit</RadioButton>
            <RadioButton name={"operatiune_fara_numerar"} checked={checked} onChange={onChangeHandler}>Operatiune fara numerar</RadioButton>
            <RadioButton name={"deschidere_cont_curent"} checked={checked} onChange={onChangeHandler}>Deschidere cont curent</RadioButton>
            <RadioButton name={"deschidere_cont_minori"} checked={checked} onChange={onChangeHandler}>Deschidere cont minori</RadioButton>
            <RadioButton name={"deschidere_cont_refugiati"} checked={checked} onChange={onChangeHandler}>Deschidere conturi refugiati</RadioButton>
            <RadioButton name={"suport_aplicatie"} checked={checked} onChange={onChangeHandler}>Suport utilizare aplicatie George</RadioButton>
            <RadioButton name={"diagnostic_financiar"} checked={checked} onChange={onChangeHandler}>Diagnostic financiar gratuit</RadioButton>
            <RadioButton name={"credit_nevoi"} checked={checked} onChange={onChangeHandler}>Credit de nevoi personale</RadioButton>
            <RadioButton name={"credit_ipotecar"} checked={checked} onChange={onChangeHandler}>Credit ipotecar</RadioButton>
            <RadioButton name={"economisire"} checked={checked} onChange={onChangeHandler}>Economisire</RadioButton>
            <RadioButton name={"contracte_bpl"} checked={checked} onChange={onChangeHandler}>Contracte BpL</RadioButton>
            <RadioButton name={"investitii_subscriere"} checked={checked} onChange={onChangeHandler}>Investitii - subscriere</RadioButton>
            <RadioButton name={"investitii_rascumparare"} checked={checked} onChange={onChangeHandler}>Investitii - rascumparare</RadioButton>
            <RadioButton name={"asigurare"} checked={checked} onChange={onChangeHandler}>Asigurare</RadioButton>
            <RadioButton name={"pensie"} checked={checked} onChange={onChangeHandler}>Pensie privata</RadioButton>
        </Flex>
    </>)
}