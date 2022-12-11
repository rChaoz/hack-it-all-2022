import {Box, Checkbox, Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {StepContext} from "./Step";

interface Step4Props {
}

export function Step4({}: Step4Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(4), [])

    const form = useForm({
        initialValues: {
            name: context.stepsData.name ?? '',
            surname: context.stepsData.surname ?? '',
            cnp: context.stepsData.cnp ?? '',
        },

        validate: {
            name: (value) => value.length == 0 ? "Te rog sa îți introduci prenumele" : /[a-zA-ZÀ-ž- ]+/.test(value) ? null : "Prenume invalid",
            surname: (value) => value.length == 0 ? "Te rog sa îți introduci numele" : /[a-zA-ZÀ-ž- ]+/.test(value) ? null : "Nume invalid",
            cnp: (value) => (/\d{13}/.test(value) ? null : 'CNP invalid'),
        },
    });

    const [agreed, setAgreed] = useState(false)
    context.stepsData.validate = () => !form.validate().hasErrors && agreed

    return (<>
        <Title order={2} align={"center"}>Salut, cum te numesti?</Title>
        <Text pb={"md"}>Haide să ne cunoaștem. Introdu numele de familie și prenumele.</Text>
        <Box sx={{maxWidth: 300}} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Prenume"
                    placeholder="Prenumele tau"
                    {...form.getInputProps('name')}
                    onBlur={event => context.stepsData.name = event.currentTarget.value}
                />

                <TextInput
                    withAsterisk
                    label="Nume de familie"
                    placeholder="Numele tau de familie"
                    {...form.getInputProps('surname')}
                    onBlur={event => context.stepsData.surname = event.currentTarget.value}
                />

                <TextInput
                    withAsterisk
                    label="CNP"
                    placeholder="Codul Numeric Personal"
                    {...form.getInputProps('cnp')}
                    onBlur={event => context.stepsData.cnp = event.currentTarget.value}
                />

                <Checkbox
                    checked={agreed}
                    onChange={(event) => setAgreed(event.currentTarget.checked)}
                    mt="md"
                    label="Sunt de acord cu politica de prelucrare a datelor cu caracter personal"
                />

            </form>
        </Box>

    </>)
}