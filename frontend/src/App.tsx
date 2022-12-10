import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {Step1, Step1Load} from "./pages/Step1";
import React from "react";
import Step from "./pages/Step";

const routes = (<>
    <Route path={"/"} element={<Navigate to={"/step"}/>}/>
    <Route path={"/step"} element={<Step/>}>
        <Route index={true} element={<Step1 unitate={"ceva"}/>} loader={Step1Load}/>
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
                '#a3b5c9',
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