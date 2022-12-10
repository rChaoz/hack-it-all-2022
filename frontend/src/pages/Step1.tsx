import {useLoaderData} from "react-router-dom";
import {Checkbox} from "@mantine/core";
import App from "../App"

interface Step1Props {
    unitate: String
    test?: number
}

interface Step1Data {
    zile: number[]
}

export function Step1({unitate, test}: Step1Props) {
    const date_unitate = useLoaderData() as Step1Data

    const zile = date_unitate.zile

    return (<div>
        <p>Buna</p>
        <Checkbox label={"Hhe hihi"}/>
        {zile.map((zi: number) => <button>{zi}</button>)}
    </div>)
}

interface AltaComponentaProps {
    arg: string
}

function AltaComponenta({arg}: AltaComponentaProps) {
    return <div>chestii: {arg}</div>
}

export function Step1Load(): Step1Data {
    return {zile: [1, 2, 3]}
}