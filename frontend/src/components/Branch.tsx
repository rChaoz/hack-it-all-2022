import {Anchor, Box, Divider, Flex, Paper, Text, useMantineTheme} from "@mantine/core";
import {BranchModel} from "../model/BranchModel";
import {IconMapPin} from "@tabler/icons";

export interface BranchProps {
    branch: BranchModel
}

export default function Branch({branch}: BranchProps) {
    const theme = useMantineTheme()

    return (<Paper radius={"lg"} shadow={"sm"} withBorder>
        <Box p={"md"}>
            <Flex direction={"row"} justify={"space-between"}>
                <Text weight={"bold"} size={"lg"} color={theme.colorScheme == 'light' ? "bcr.8" : "bcr.4"}>{branch.name}</Text>
                <Text color={"gray"} size={"xs"}>{branch.distance}m</Text>
            </Flex>
            <Text>{branch.address}</Text>
            {branch.hours ? <Text py={"xs"} color={"green"}>Deschis astăzi: {branch.hours}</Text> :
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