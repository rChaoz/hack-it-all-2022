import {
    Text,
    createStyles,
    Title,
    MantineProvider,
    Center,
    Button, Flex, Container, Box,
} from "@mantine/core";
import React from "react";
import {IconCircleCheck} from "@tabler/icons";

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
        <Container size={"xs"}>
            <Flex direction={"column"} p={"md"} align={"center"} justify={"center"} className={classes.flex}>
                <Title order={4} align={"center"}>Programare vizită la BCR</Title>
                <Box py={"xl"}><IconCircleCheck size={100}/></Box>
                <Title order={3} align={"center"}>Vizita în unitatea BCR a fost programată cu succes!</Title>
                <Text align={"center"}>Urmează să primești pe adresa de mail toate informațiile despre programarea ta.</Text>
                <div className={classes.separator}/>
                <Center className={classes.button}><Button variant={"white"} fullWidth>Înapoi la bcr.ro</Button></Center>
            </Flex>
        </Container>

    </MantineProvider>)
}