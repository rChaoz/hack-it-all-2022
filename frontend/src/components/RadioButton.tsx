import {Button, ButtonProps} from "@mantine/core";

interface RadioButtonProps extends Omit<ButtonProps, 'variant'> {
    name: string,
    checked?: string,
    onChange?: (name: string) => void
}

export default function RadioButton({name, checked, onChange, children, ...rest}: RadioButtonProps) {
    return (<Button variant={name === checked ? "filled" : "outline"} onClick={() => {
        if (onChange != null) onChange(name)
    }} {...rest}>
        {children}
    </Button>)
}