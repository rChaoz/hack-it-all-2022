import {Checkbox, Flex, Space, Text, TextInput, Title} from "@mantine/core";
import React, {useCallback, useContext, useDeferredValue, useEffect, useMemo, useState} from "react";
import {StepContext} from "./Step";
import {IconSearch} from "@tabler/icons";
import Branch from "../components/Branch";
import {BranchModel} from "../model/BranchModel";
import LoadingData from "../components/LoadingData";


interface Step2Props {
}

export function Step2({}: Step2Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(2), [])

    const resolve = useMemo( () => loadInitial(), [])
    const branchCallback = useCallback((branch: BranchModel) => {
        context.stepsData.branchID = branch.id
        context.stepsData.branchName = branch.name
        context.stepsData.branchAddress = branch.address
        context.stepsData.nextStep(true)
    }, [context])

    const [filterOpened, setFilterOpened] = useState(false)
    const [searchByUndeferred, setSearchBy] = useState("")
    const searchBy = useDeferredValue(searchByUndeferred).toLowerCase()

    return (<>
        <Title order={2} align={"center"}>În ce locație ne vizitezi?</Title>
        <Text pb={"md"}>Caută unitatea BCR unde programezi vizita:</Text>
        <TextInput label="Caută unitatea" placeholder="Nume unitate / Adresă / Zonă" icon={<IconSearch size={20} />} onChange={event => {
            setSearchBy(event.currentTarget.value ?? "")
        }}/>
        <Checkbox pt={"xs"} checked={filterOpened} onChange={(event) => setFilterOpened(event.currentTarget.checked)} label={"Afișează doar sucursale deschise astăzi"}/>
        <Space h={"md"}/>
        <LoadingData resolve={resolve}>
            {(branches: BranchModel[]) => (<Flex direction={"column"} gap={"xs"}>
                {branches.filter(branch => (!filterOpened || (branch.hours != null && branch.hours != "indisponibil")) &&
                    (searchBy == "" || branch.name.toLowerCase().includes(searchBy) || branch.address.toLowerCase().includes(searchBy))).slice(0, 50)
                    .map(branch => <Branch key={branch.id} branch={branch} callback={branchCallback}/>)}
            </Flex>)}
        </LoadingData>
    </>)
}

async function loadInitial(): Promise<BranchModel[]> {
    return await (await fetch("http://localhost/api/all")).json()
}