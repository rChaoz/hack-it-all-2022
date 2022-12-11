import {Center, Text} from "@mantine/core";
import {IconX} from "@tabler/icons";

export default function Error() {
    return <Center sx={{height: 300}}><IconX color={"red"}/><Text italic color={"red"}>Failed to load</Text></Center>
}