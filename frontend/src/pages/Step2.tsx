import {useLoaderData} from "react-router-dom";
import {Text, Checkbox, createStyles, Flex, Loader, TextInput, Title} from "@mantine/core";
import React from "react";

const useStyles = createStyles(theme => ({
}))

interface Step2Props {

}

export function Step2({}: Step2Props) {
    const {classes} = useStyles()

    return (<div>
        <Title order={2} align={"center"} py={"sm"}>In ce locatie ne vizitezi?</Title>
        <Text pt={"xs"} pb={"md"}>Cauta unitatea BCR unde programezi vizita</Text>
        <TextInput label="Cauta unitatea" placeholder="Nume unitate / Adresa / Zona"/>

    </div>)
}