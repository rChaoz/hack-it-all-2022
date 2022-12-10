import {
    Text,
    createStyles,
    Title,
    MantineProvider,
    Center,
    Button
} from "@mantine/core";
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
        <Title order={4} align={"center"} py={"md"}>Programare vizita la BCR</Title>
        <Center py={"xl"}><IconCircleCheck size={100}/></Center>
        <Title order={3} align={"center"} py={"sm"}>Vizita in unitatea BCR a fost programata cu succes!</Title>
        <Text align={"center"} pt={"xl"} pb={"md"}>Urmeaza sa primesti pe adresa de mail toate informatiile despre programarea ta.</Text>
        <Center><Button variant={"white"}>Înapoi la bcr.ro</Button></Center>

    </MantineProvider>)
}