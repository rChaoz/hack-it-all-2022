import {useLoaderData} from "react-router-dom";
import {Checkbox, Title, Text} from "@mantine/core";
import App from "../App"

interface Step6Props {

}



export function Step6({}: Step6Props) {

    return (<>
        <Title font-size={20} order={2} align={"center"}>Sumarul programării:</Title>
        <Text py={10}>Prenume, confirmă dacă datele de mai jos sunt corecte.</Text>

    </>)
}





