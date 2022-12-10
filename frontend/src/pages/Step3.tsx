import {Text, Title} from "@mantine/core";
import {DatePicker} from '@mantine/dates';

interface Step3Props {
}


export function Step3({}: Step3Props) {

    return (<div>
        <Title font-size={20} order={2} align={"center"}>În ce zi ne vizitezi?</Title>
        <Text py={10}>Alege data și intervalul orar pentru vizita la BCR-NumeUnitate</Text>
        <DatePicker placeholder="Pick date" label="Alege data" withAsterisk/>
    </div>)
}