import {Outlet} from "react-router-dom";
import {AppShell, Button, Center, createStyles, Flex, Header, Progress, Text, Title} from "@mantine/core";
import React, {Dispatch, SetStateAction, useState} from "react";
import {IconChevronLeft} from "@tabler/icons";

const useStyles = createStyles(theme => ({
    header: {
        backgroundColor: theme.colors.bcr[9],
        color: theme.white,
    },
    bar: {
        position: "relative",
        height: 80,
    },
    step: {
        backgroundColor: theme.colors.bcr[0],
        height: 70,
    },
    buttonBack: {
        position: "absolute",
        paddingInline: 0,
        marginLeft: theme.spacing.md,
        left: 0,
        border: "none",
        background: "none",
    },
}))

export interface StepContextValue {
    step: number
    setStep: Dispatch<SetStateAction<number>>
}

export const StepContext = React.createContext<StepContextValue | null>(null)

const steps = [
    {title: "Alege scopul vizitei"},
    {title: "Alege unitatea BCR"},
    {title: "Alege data și intervalul orar"},
    {title: "Să ne cunoaștem!"},
    {title: "Lasă-ne datele de contact"},
    {title: "Sumarul programării"},
]

interface StepProps {
}

export default function Step({}: StepProps) {
    const [step, setStep] = useState(1)
    return <AppShell header={<StepHeader step={step}/>} footer={<Center>
        <Button>{step < steps.length ? "Continuă" : "Programează întâlnirea"}</Button>
    </Center>}>
        <StepContext.Provider value={{step, setStep}}>
            <Outlet/>
        </StepContext.Provider>
    </AppShell>
}

interface StepHeaderProps {
    step: number
}

function StepHeader({step}: StepHeaderProps) {
    const {classes} = useStyles()

    return <Header height={150} className={classes.header}>
        <Center className={classes.bar}>
            <Button className={classes.buttonBack}>
                <IconChevronLeft size={32}/>
            </Button>
            <Title align={"center"}>Programare vizită la BCR</Title>
        </Center>
        <Center className={classes.step}>
            <Flex direction={"column"}>
                <Text color={"bcr.3"}>Pasul {step} - {steps[step - 1].title}</Text>
                <Progress value={step / steps.length * 100} color={"bcr.9"}/>
            </Flex>
        </Center>
    </Header>
}