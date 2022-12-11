import {Flex, Space, Text, TextInput, Title} from "@mantine/core";
import React, {Suspense, useContext, useEffect, useState} from "react";
import {StepContext} from "./Step";
import {IconSearch} from "@tabler/icons";
import Branch from "../components/Branch";
import {BranchModel} from "../model/BranchModel";
import {Await} from "react-router-dom";
import Placeholder from "../components/Placeholder";
import Error from "../components/Error";


interface Step2Props {
}

export function Step2({}: Step2Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(2), [])

    const [resolve, setResolve] = useState(loadInitial())

    return (<>
        <Title order={2} align={"center"}>În ce locație ne vizitezi?</Title>
        <Text pb={"md"}>Caută unitatea BCR unde programezi vizita:</Text>
        <TextInput label="Caută unitatea" placeholder="Nume unitate / Adresă / Zonă" icon={<IconSearch size={20}/>}/>
        <Space h={"md"}/>
        <Suspense fallback={<Placeholder/>}>
            <Await resolve={resolve} errorElement={<Error/>}>
                {(branches: BranchModel[]) => (<Flex direction={"column"} gap={"xs"}>
                    {branches.map(branch => <Branch key={branch.name} branch={branch}/>)}
                </Flex>)}
            </Await>
        </Suspense>
    </>)
}

export const apiKey = {key: ""}

async function loadInitial(): Promise<BranchModel[]> {
    return await (await fetch("http://localhost:8080/api/all")).json()
}