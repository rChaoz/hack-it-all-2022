import {Text, Checkbox, createStyles, TextInput, Title, MantineProvider, ThemeIcon} from "@mantine/core";
import React from "react";
import {IconCircleCheck} from "@tabler/icons";

const useStyles = createStyles(theme => ({
}))

interface SuccessProps {

}

export function Success({}: SuccessProps) {
    const {classes} = useStyles()

    return (<MantineProvider inherit theme={{
        globalStyles: theme => ({
            body: {
                backgroundColor: theme.colors.bcr[9],
                color: 'white',
            }
        })
    }}>
        <Title order={4} align={"center"} py={"sm"}>Programare vizita la BCR</Title>
        <IconCircleCheck />
        <Title order={3} align={"center"} py={"sm"}>Vizita in unitatea BCR a fost programata cu succes!</Title>
        <Text pt={"xs"} pb={"md"}>Urmeaza sa primesti pe adresa de mail toate informatiile despre programarea ta.</Text>


    </MantineProvider>)
}