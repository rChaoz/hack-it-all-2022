import {Box, Text, TextInput, Title} from "@mantine/core";
import React, {useContext, useEffect} from "react";
import {useForm} from "@mantine/form";
import {StepContext} from "./Step";

interface Step5Props {
}


export function Step5({}: Step5Props) {
    const context = useContext(StepContext)!;
    useEffect(() => context.setStep(5), [])

    const form = useForm({
        initialValues: {
            email: '',
            telefon: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => /^\S+@\S+$/.test(value) ? null : 'E-mail invalid',
            telefon: (value) => /\+?\d{10,14}/.test(value) ? null : 'Telefon invalid',
        },
    });

    return (<div>
        {/*nume va fi primit de la step4*/}
        <Title order={2} align={"center"}>NUME, lasa-ne datele de contact</Title>
        <Text pb={"md"}>Pe datele furnizate iti vom transmite informatiile pentru aceasta programare.</Text>
        <Box sx={{maxWidth: 300}} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Adresa de e-mail"
                    placeholder="nume@exemplu.rp"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    withAsterisk
                    label="Numar de telefon mobil"
                    placeholder="Ex: 0733 768 565"
                    {...form.getInputProps('email')}
                />

            </form>
        </Box>

    </div>)
}