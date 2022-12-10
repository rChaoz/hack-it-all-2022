import {Button, Checkbox, createStyles, Flex, Text, Title} from "@mantine/core";
import React from "react";

const useStyles = createStyles(theme => ({
}))

interface Step1Props {
}

export function Step1({}: Step1Props) {
    const {classes} = useStyles()

    return (<div>
        <Title font-size={20} order={2} align={"center"}>Despre ce vrei sa vorbim?</Title>
        <Text py={10}>Alege un motiv pentru care programezi vizita in unitate</Text>
        <Flex
            mih={50}
            bg="white"
            gap="xs"
            justify="flex-start"
            align="stretch"
            direction="column"
            wrap="wrap"
        >
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
    </div>)
}