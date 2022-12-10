import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Step1, Step1Load} from "./pages/Step1";
import React from "react";
import Step from "./pages/Step";
import {Step2} from "./pages/Step2";
import {Step5} from "./pages/Step5";

const routes = (<>
    <Route path={"/step"} element={<Step/>}>
        <Route index={true} element={<Step1 unitate={"ceva"}/>} loader={Step1Load}/>
        <Route path={"locatie"} element={<Step2 />}/>
        <Route path={"contact"} element={<Step5 />}/>
    </Route>
</>)

const router = createBrowserRouter(createRoutesFromElements(routes))

export default function App() {
    return (<MantineProvider withNormalizeCSS withGlobalStyles theme={{
        colorScheme: "light",
        fontFamily: "'Montserrat', sans-serif",
        headings: {
            fontFamily: "'Montserrat', sans-serif",
        },
        primaryColor: "blue",

        colors: {
            bcr: [
                '#f4f6fa',
                '#8FA3CC',
                '#6684A3',
                '#5c7999',
                '#5C97EB',
                '#2575E4',
                '#1a67d2',
                '#3568AC',
                '#264C7D',
                '#21416c',
            ],
        },
    }}>
        <RouterProvider router={router}/>
    </MantineProvider>)
}