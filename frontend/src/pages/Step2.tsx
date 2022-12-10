import {Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {StepContext} from "./Step";


interface Step2Props {
}

export function Step2({}: Step2Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(2), [])

    return (<>
        <Title order={2} align={"center"} py={"sm"}>În ce locație ne vizitezi?</Title>
        <Text pt={"xs"} pb={"md"}>Caută unitatea BCR unde programezi vizita:</Text>
        <TextInput label="Caută unitatea" placeholder="Nume unitate / Adresă / Zonă"/>
    </>)
}