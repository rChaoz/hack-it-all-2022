import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import React from "react";
import Step from "./pages/Step";
import {Step1} from "./pages/Step1";
import {Step2} from "./pages/Step2";
import {Step3} from "./pages/Step3";
import {Step4} from "./pages/Step4";
import {Step5} from "./pages/Step5";
import {Step6} from "./pages/Step6";
import {Success} from "./pages/Success";
import {Delete} from "./pages/Delete";

const routes = (<>
    <Route path={"/"} element={<Navigate to={"/step"}/>}/>
    <Route path={"/step"} element={<Step/>}>
        <Route index={true} element={<Step1/>}/>
        <Route path={"location"} element={<Step2/>}/>
        <Route path={"date"} element={<Step3/>}/>
        <Route path={"name"} element={<Step4 />}/>
        <Route path={"contact"} element={<Step5 />}/>
        <Route path={"summary"} element={<Step6 />}/>
    </Route>
    <Route path={"/success"} element={<Success/>}/>
    <Route path={"/delete"} element={<Delete/>}/>
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

        components: {
            Title: {
                defaultProps: {
                    pb: "md",
                }
            }
        },
    }}>
        <RouterProvider router={router}/>
    </MantineProvider>)
}