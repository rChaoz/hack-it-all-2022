import {
    Text,
    createStyles,
    Title,
    MantineProvider,
    Center,
    Button, Flex, Container, Box, Anchor,
} from "@mantine/core";
import React from "react";
import {IconCircleCheck, IconTrash} from "@tabler/icons";
import {Link} from "react-router-dom";

const useStyles = createStyles(theme => ({
    flex: {
        height: "90vh",
        [theme.fn.smallerThan("sm")]: {
            height: "100vh",
        },
    },
    separator: {
        height: 100,
        [theme.fn.smallerThan("sm")]: {
            height: "100%",
        },
    },
    button: {
        width: 300,
        [theme.fn.smallerThan("sm")]: {
            width: "initial",
            alignSelf: "stretch",
        },
    },
}))

interface SuccessProps {
}

export function Delete({}: SuccessProps) {
    const {classes} = useStyles()

    return (<MantineProvider inherit theme={{
        globalStyles: theme => ({
            body: {
                backgroundColor: theme.colors.bcr[9],
                color: 'white',
            }
        })
    }}>
        <Container size={"xs"}>
            <Flex direction={"column"} p={"md"} align={"center"} justify={"center"} className={classes.flex}>
                <Title order={4} align={"center"} py={"md"}>Programare vizită la BCR</Title>
                <Center py={"xl"}><IconTrash size={100}/></Center>
                <Title order={3} align={"center"} py={"sm"}>Vizita in unitatea BCR a fost anulată.</Title>
                <Text align={"center"} pt={"xl"} pb={"md"}>Îți mulțumim! Poți programa o nouă vizită oricând,
                    accesând <Anchor href={"https://www.bcr.ro"} color={"bcr.4"}>www.bcr.ro.</Anchor></Text>
                <div className={classes.separator}/>
                <Center className={classes.button}><Button variant={"white"}>Programare nouă</Button></Center>
            </Flex>
        </Container>

    </MantineProvider>)
}