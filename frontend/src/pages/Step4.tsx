import {useLoaderData} from "react-router-dom";
import {Text, Checkbox, createStyles, Flex, Loader, TextInput, Title, Box, Group, Button} from "@mantine/core";
import React from "react";
import {useForm} from "@mantine/form";

const useStyles = createStyles(theme => ({
}))

interface Step4Props {

}



export function Step4({}: Step4Props) {
    const {classes} = useStyles()

    const form = useForm({
        initialValues: {
            nume: '',
            familie:'',
            cnp:'',
            termsOfService: false,
        },

        validate: {
            nume: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'), //aici pui tu regexu cum trebuie
            familie: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            cnp: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (<div>
        <Title order={2} align={"center"} py={"sm"}>Salut, cum te numesti?</Title>
        <Text pt={"xs"} pb={"md"}>Haide sa ne cunoastem. Introdu numele de familie si prenumele.</Text>
        <Box sx={{ maxWidth: 300 }} mx="auto">
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
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

            </form>
        </Box>

    </div>)
}