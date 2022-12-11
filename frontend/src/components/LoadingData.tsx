import Placeholder from "./Placeholder";
import {Await} from "react-router-dom";
import Error from "./Error";
import React, {Suspense} from "react";
import {AwaitResolveRenderFunction} from "react-router/dist/lib/components";
import {TrackedPromise} from "@remix-run/router";

export interface LoadingDataProps {
    resolve: TrackedPromise | any
    children: React.ReactNode | AwaitResolveRenderFunction
}

export default function LoadingData({resolve, children}: LoadingDataProps) {
    return (<Suspense fallback={<Placeholder/>}>
        <Await resolve={resolve} errorElement={<Error/>}>{children}</Await>
    </Suspense>)
}