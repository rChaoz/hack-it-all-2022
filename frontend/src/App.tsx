import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import {Step1, Step1Load} from "./pages/step1";
import React from "react";

const routes = (<>
    <Route path={"/"} element={<Step1 unitate={"unitate"}/>} loader={Step1Load}/>
    <Route path={"/step2"}/>
</>)

const router = createBrowserRouter(createRoutesFromElements(routes))

export default function App() {
    return (<MantineProvider>
        <RouterProvider router={router}/>
    </MantineProvider>)
}