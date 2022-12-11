import {Flex, Space, Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {StepContext} from "./Step";
import {IconSearch} from "@tabler/icons";
import Branch from "../components/Branch";
import {BranchModel} from "../model/BranchModel";
import {useLoaderData} from "react-router-dom";


interface Step2Props {
}

export function Step2({}: Step2Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(2), [])

    const branches: BranchModel[] = useLoaderData() as any

    return (<>
        <Title order={2} align={"center"}>În ce locație ne vizitezi?</Title>
        <Text pb={"md"}>Caută unitatea BCR unde programezi vizita:</Text>
        <TextInput label="Caută unitatea" placeholder="Nume unitate / Adresă / Zonă" icon={<IconSearch size={20}/>}/>
        <Space h={"md"}/>
        <Flex direction={"column"} gap={"xs"}>
            {branches.map(branch => <Branch key={branch.name} branch={branch}/>)}
        </Flex>
    </>)
}

export const apiKey = {key: ""}

export async function Step2Loader(): Promise<BranchModel[]> {
    return await (await fetch("http://localhost:8080/api/all")).json()
}