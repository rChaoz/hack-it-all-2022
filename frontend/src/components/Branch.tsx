import {Anchor, Box, createStyles, Divider, Flex, Paper, Text, useMantineTheme} from "@mantine/core";
import {BranchModel} from "../model/BranchModel";
import {IconMapPin} from "@tabler/icons";

const useStyles = createStyles(theme => ({
    clickable: {
        cursor: "pointer",
        borderRadius: `${theme.radius.lg}px ${theme.radius.lg}px 0 0`,
        transition: "background-color .15s",
        "&:hover": {
            backgroundColor: theme.colorScheme == 'light' ? theme.fn.darken(theme.colors.bcr[0], .07) : theme.colors.dark[6],
        }
    },
}))

export interface BranchProps {
    branch: BranchModel
    callback: (name: string) => void
}

export default function Branch({branch, callback}: BranchProps) {
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return (<Paper radius={"lg"} shadow={"sm"} withBorder>
        <Box p={"md"} className={classes.clickable} onClick={() => callback(branch.name)}>
            <Flex direction={"row"} justify={"space-between"}>
                <Text weight={"bold"} size={"lg"} color={theme.colorScheme == 'light' ? "bcr.8" : "bcr.4"}>{branch.name}</Text>
                <Text color={"gray"} size={"xs"}>{Math.floor(branch.distance)}m</Text>
            </Flex>
            <Text>{branch.address}</Text>
            {branch.hours != null && branch.hours != "indisponibil" ? <Text py={"xs"} color={"green"}>Deschis astăzi: {branch.hours}</Text> :
                <Text py={"xs"} color={"red"}>Închis astăzi, disponibil începând de luni</Text>}
            {branch.operations.replaceAll("|", " • ")}
        </Box>
        <Divider orientation={"horizontal"}/>
        <Flex direction={"row"} justify={"space-between"} p={"md"}>
            <Anchor weight={"bold"} href={`https://maps.google.com/maps?q=${branch.latitude}%2C${branch.longitude}`} target={"_blank"}>Vezi pe hartă</Anchor>
            <IconMapPin/>
        </Flex>
    </Paper>)
}