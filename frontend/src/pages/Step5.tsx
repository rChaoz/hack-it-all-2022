import {useLoaderData} from "react-router-dom";
import {Text, Checkbox, createStyles, Flex, Loader, TextInput, Title, Box, Group, Button} from "@mantine/core";
import React from "react";
import {useForm} from "@mantine/form";

const useStyles = createStyles(theme => ({
}))

interface Step5Props {

}



export function Step5({}: Step5Props) {
    const {classes} = useStyles()

    const form = useForm({
        initialValues: {
            email: '',
            telefon:'',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            telefon: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'), //la fel ca la CNP
        },
    });

    return (<div>
        {/*nume va fi primit de la step4*/}
        <Title order={2} align={"center"} py={"sm"}>NUME, lasa-ne datele de contact</Title>
        <Text pt={"xs"} pb={"md"}>Pe datele furnizate iti vom transmite informatiile pentru aceasta programare.</Text>
        <Box sx={{ maxWidth: 300 }} mx="auto">
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