import {Outlet, useNavigate} from "react-router-dom";
import {ActionIcon, AppShell, Button, Center, Container, createStyles, Flex, Footer, Header, Paper, Popover, Progress, Text, Title, useMantineTheme} from "@mantine/core";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {IconChevronLeft} from "@tabler/icons";
import {useMediaQuery} from "@mantine/hooks";
import ColorSchemeToggle from "../components/ColorSchemeToggle";

const useStyles = createStyles(theme => ({
    header: {
        color: theme.white,
    },
    bar: {
        backgroundColor: theme.colors.bcr[9],
        position: "relative",
        height: 80,
    },
    step: {
        height: 70,
    },
    buttonBack: {
        position: "absolute",
        left: theme.spacing.xl,
    },
    colorSchemeToggle: {
        position: "absolute",
        marginRight: theme.spacing.xs,
        right: 0,
    }
}))

export interface StepContextValue {
    step: number
    setStep: Dispatch<SetStateAction<number>>
    smallScreen: boolean
    stepsData: StepsData
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

export interface StepsData {
    action?: string,
    idBranch?: string,
    date?: string,
    time?: string,
    name?: string,
    surname?: string,
    cnp?: string,
    email?: string,
    phone?: string,

    isValid: boolean
    validate?: () => boolean
}

export default function Step() {
    const [step, setStep] = useState(1)

    const stepsData = useRef<StepsData>({isValid: false})

    const theme = useMantineTheme()
    const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

    return <AppShell padding={smallScreen ? "xs" : 0} header={<StepHeader step={step} smallScreen={smallScreen}/>}
                     footer={<StepFooter step={step} stepsData={stepsData.current}/>}>
        <StepContext.Provider value={{step, setStep, smallScreen, stepsData: stepsData.current}}>
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
    const navigate = useNavigate()

    return <Header height={150} className={classes.header}>
        <Center className={classes.bar}>
            {step > 1 ?
                <ActionIcon className={classes.buttonBack} onClick={() => {
                    navigate(steps[step - 2].link)
                }
                }>
                    <IconChevronLeft size={32}/>
                </ActionIcon>
                : null}
            <Title mx={80} pb={0} size={smallScreen ? "h2" : "h1"} inline align={"center"}>Programare vizită la BCR</Title>
            <ColorSchemeToggle className={classes.colorSchemeToggle}/>
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
    stepsData: StepsData
}

function StepFooter({step, stepsData}: StepFooterProps) {
    const navigate = useNavigate()

    const [popover, setPopover] = useState(false)

    return (<Footer height={60}>
        <Container size={300}>
            <Flex direction={"column"} align={"stretch"}>
                <Popover width={200} position="top" withArrow shadow="md" opened={popover} onChange={setPopover}>
                    <Popover.Target>
                        <Button my={12} onClick={() => {
                            if (stepsData.validate == null || !stepsData.validate()) {
                                //setPopover(true)
                                //return
                            }
                            stepsData.validate = undefined
                            if (step < 6) navigate(steps[step].link)
                            else {
                                // TODO efectuare comanda
                            }
                        }}>{step < steps.length ? "Continuă" : "Programează întâlnirea"}</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">Te rog să completezi toate câmpurile</Text>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
        </Container>
    </Footer>)
}