import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import {Step1, Step1Load} from "./pages/Step1";
import React from "react";
import Step from "./pages/Step";

const routes = (<>
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
    }}>
        <RouterProvider router={router}/>
    </MantineProvider>)
}