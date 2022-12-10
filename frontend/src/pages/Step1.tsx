import {useLoaderData} from "react-router-dom";
import {Button, Checkbox, createStyles, Flex} from "@mantine/core";
import React from "react";

const useStyles = createStyles(theme => ({
}))

interface Step1Props {
    unitate: String
    test?: number
}

interface Step1Data {
    zile: number[]
}

export function Step1({unitate, test}: Step1Props) {
    const {classes} = useStyles()
    const date_unitate = useLoaderData() as Step1Data

    const zile = date_unitate.zile

    return (<div>
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

interface AltaComponentaProps {
    arg: string
}

function AltaComponenta({arg}: AltaComponentaProps) {
    return <div>chestii: {arg}</div>
}

export function Step1Load(): Step1Data {
    return {zile: [1, 2, 3]}
}