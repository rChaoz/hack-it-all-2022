import {
    Text,
    createStyles,
    Title,
    MantineProvider,
    Center,
    Button
} from "@mantine/core";
import React from "react";
import {IconCircleCheck, IconTrash} from "@tabler/icons";

const useStyles = createStyles(theme => ({
}))

interface DeleteProps {

}

export function Delete({}: DeleteProps) {
    const {classes} = useStyles()

    return (<MantineProvider inherit theme={{
        globalStyles: theme => ({
            body: {
                backgroundColor: theme.colors.bcr[9],
                color: 'white',
            }
        })
    }}>
        <Title order={4} align={"center"} py={"md"}>Programare vizită la BCR</Title>
        <Center py={"xl"}><IconTrash size={100}/></Center>
        <Title order={3} align={"center"} py={"sm"}>Vizita in unitatea BCR a fost anulată.</Title>
        <Text align={"center"} pt={"xl"} pb={"md"}>Îți mulțumim! Poți programa o nouă vizită oricând, accesând www.bcr.ro.</Text>
        <Center><Button variant={"white"}>Programare nouă</Button></Center>

    </MantineProvider>)
}