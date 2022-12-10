import {Outlet} from "react-router-dom";
import {AppShell, Button, Center, createStyles, Flex, Header, Progress, Text, Title} from "@mantine/core";
import {useState} from "react";

const useStyles = createStyles(theme => ({
    header: {
        backgroundColor: "#21416c",
        color: theme.white,
    },
    bar: {
        height: 80,
    },
    step: {
        backgroundColor: "#f4f6fa",
    },
}))

interface StepProps {

}

export default function Step({}: StepProps) {
    const [step, setStep] = useState(1)

    return <AppShell header={<StepHeader step={step}/>}>
        <Outlet/>
    </AppShell>
}

interface StepHeaderProps {
    step: number,
}

function StepHeader({step}: StepHeaderProps) {
    const {classes} = useStyles()
    return <header className={classes.header}>
        <Center className={classes.bar}>
            <Title>Programare vizita la BCR</Title>
        </Center>
        <Center py={"md"} className={classes.step}>
            <Flex direction={"column"}>
                <Text color={"#5c7999"}>Pasul {step} - Alege scopul vizitei</Text>
                <Progress value={step / 7 * 100} color={"#21416c"}/>
            </Flex>
        </Center>
    </header>
}