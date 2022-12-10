import {Box, Checkbox, Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {useForm} from "@mantine/form";
import {StepContext} from "./Step";

interface Step4Props {
}

export function Step4({}: Step4Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(4), [])

    const form = useForm({
        initialValues: {
            name: '',
            surname: '',
            cnp: '',
            termsOfService: false,
        },

        validate: {
            name: (value) => value.length == 0 ? "Te rog sa iți introduci prenumele" : /[a-zA-ZÀ-ž- ]+/.test(value) ? null : "Prenume invalid",
            surname: (value) => value.length == 0 ? "Te rog sa iți introduci numele" : /[a-zA-ZÀ-ž- ]+/.test(value) ? null : "Nume invalid",
            cnp: (value) => (/\d{13}/.test(value) ? null : 'CNP invalid'),
        },
    });

    return (<>
        <Title order={2} align={"center"}>Salut, cum te numesti?</Title>
        <Text pb={"md"}>Haide sa ne cunoastem. Introdu numele de familie si prenumele.</Text>
        <Box sx={{maxWidth: 300}} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Prenume"
                    placeholder="Prenumele tau"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    withAsterisk
                    label="Nume de familie"
                    placeholder="Numele tau de familie"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    withAsterisk
                    label="CNP"
                    placeholder="Codul Numeric Personal"
                    {...form.getInputProps('email')}
                />

                <Checkbox
                    mt="md"
                    label="Sunt de acord cu politica de prelucrare a datelor cu caracter personal"
                    {...form.getInputProps('termsOfService', {type: 'checkbox'})}
                />

            </form>
        </Box>

    </>)
}