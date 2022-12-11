import {Paper, Text, Title, useMantineTheme} from "@mantine/core";
import {useContext, useEffect} from "react";
import {StepContext, StepsData} from "./Step";

interface Step6Props {
}

export function Step6({}: Step6Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(6), [])

    const data = context.stepsData as Required<StepsData>
    const theme = useMantineTheme()

    return (<>
        <Title order={2} align={"center"}>Sumarul programării:</Title>
        <Text>{data.name}, confirmă dacă datele de mai jos sunt corecte.</Text>

        <Text pt={"md"} weight={"bold"}>Scopul întâlnirii</Text>
        <Paper sx={{backgroundColor: theme.colorScheme == 'light' ? theme.colors.bcr[0] : theme.colors.dark[8]}} p={"sm"}>
            {[...data.actions.values()].map(action => <Text key={action} size={"lg"}>{action}</Text> )}
        </Paper>

        <Text pt={"md"} weight={"bold"}>Coordonate unitate</Text>
        <Paper sx={{backgroundColor: theme.colorScheme == 'light' ? theme.colors.bcr[0] : theme.colors.dark[8]}} p={"sm"}>
            <Text size={"lg"}>{data.branchName}</Text>
            <Text color={"gray"}>{data.branchAddress}</Text>
        </Paper>

        <Text pt={"md"} weight={"bold"}>Data si ora</Text>
        <Paper sx={{backgroundColor: theme.colorScheme == 'light' ? theme.colors.bcr[0] : theme.colors.dark[8]}} p={"sm"}>
            <Text size={"lg"}>{data.date.toDateString()}, {data.time}</Text>
        </Paper>

        <Text pt={"md"} weight={"bold"}>Nume complet</Text>
        <Paper sx={{backgroundColor: theme.colorScheme == 'light' ? theme.colors.bcr[0] : theme.colors.dark[8]}} p={"sm"}>
            <Text size={"lg"}>{data.name} {data.surname}</Text>
        </Paper>

        <Text pt={"md"} weight={"bold"}>Date de contact</Text>
        <Paper sx={{backgroundColor: theme.colorScheme == 'light' ? theme.colors.bcr[0] : theme.colors.dark[8]}} p={"sm"}>
            <Text size={"lg"}>{data.email}</Text>
            <Text size={"lg"}>{data.phone}</Text>
        </Paper>
    </>)
}





