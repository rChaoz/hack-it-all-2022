import {Outlet, useNavigate} from "react-router-dom";
import {AppShell, Button, Center, Container, createStyles, Flex, Footer, Header, Paper, Progress, Text, Title, useMantineTheme} from "@mantine/core";
import React, {Dispatch, SetStateAction, useState} from "react";
import {IconChevronLeft} from "@tabler/icons";
import {useMediaQuery} from "@mantine/hooks";

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
    smallScreen: boolean
}

export const StepContext = React.createContext<StepContextValue | null>(null)

const steps = [
    {title: "Alege scopul vizitei", link: ""},
    {title: "Alege unitatea BCR", link: "location"},
    {title: "Alege data și intervalul orar", link: "date"},
    {title: "Să ne cunoaștem!", link: "name"},
    {title: "Lasă-ne datele de contact", link: "contact"},
    {title: "Sumarul programării", link: "summary"},
]

export interface FormData {
    action: string,
    idSucursala: string,
    date: string,
    time: string,
    name: string,
    surname: string,
    cnp: string,
    email: string,
    phone: string,

}
interface StepProps {
}

export default function Step({}: StepProps) {
    const [step, setStep] = useState(1)

    const theme = useMantineTheme()
    const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

    return <AppShell padding={0} header={<StepHeader step={step} smallScreen={smallScreen}/>} footer={<StepFooter step={step}/>}>
        <StepContext.Provider value={{step, setStep, smallScreen}}>
            <Container size={"sm"}>
                {smallScreen ? <Outlet/> :
                    <Paper shadow={"md"} p={"sm"} m={"xs"} withBorder>
                        <Outlet/>
                    </Paper>
                }
            </Container>
        </StepContext.Provider>
    </AppShell>
}

interface StepHeaderProps {
    step: number
    smallScreen: boolean
}

function StepHeader({step, smallScreen}: StepHeaderProps) {
    const {classes} = useStyles()

    return <Header height={150} className={classes.header}>
        <Center className={classes.bar}>
            <Button className={classes.buttonBack}>
                <IconChevronLeft size={32}/>
            </Button>
            <Title mx={50} pb={0} size={smallScreen ? "h2" : "h1"} inline align={"center"}>Programare vizită la BCR</Title>
        </Center>
        <Center className={classes.step}>
            <Flex direction={"column"}>
                <Text color={"bcr.3"}>Pasul {step} - {steps[step - 1].title}</Text>
                <Progress value={step / steps.length * 100} color={"bcr.9"}/>
            </Flex>
        </Center>
    </Header>
}

interface StepFooterProps {
    step: number
}

function StepFooter({step}: StepFooterProps) {
    const navigate = useNavigate()

    return (<Footer height={60}>
        <Container size={300}>
            <Flex direction={"column"} align={"stretch"}>
                <Button my={12} onClick={() => navigate(steps[step].link)}>{step < steps.length ? "Continuă" : "Programează întâlnirea"}</Button>
            </Flex>
        </Container>
    </Footer>)
}