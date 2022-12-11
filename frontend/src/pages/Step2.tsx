import {Flex, Space, Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {StepContext} from "./Step";
import {IconSearch} from "@tabler/icons";
import Branch from "../components/Branch";


interface Step2Props {
}

export function Step2({}: Step2Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(2), [])

    return (<>
        <Title order={2} align={"center"}>În ce locație ne vizitezi?</Title>
        <Text pb={"md"}>Caută unitatea BCR unde programezi vizita:</Text>
        <TextInput label="Caută unitatea" placeholder="Nume unitate / Adresă / Zonă" icon={<IconSearch size={20}/>}/>
        <Space h={"md"}/>
        <Flex direction={"column"} gap={"xs"}>
            <Branch branch={{
                county: "Ilfov",
                city: "Bragadiru",
                name: "BCR Bragadiru",
                address: "slobozenii de sus nr 8, langa shaormerie",
                operations: "Creditare|Operatiuni cu numerar la echipamentele bancare|Operatiuni cu numerar in zona rapida",
                latitude: 50,
                longitude: 50,
                distance: 760,
                hours: "09:00 - 17:00",
                phoneNumber: "07samasugi",
                phoneHours: "09:00 - 16:30",
            }}/>
        </Flex>
    </>)
}