"use client"
import React from 'react'
import pathAppend from "@/app/utils/utils"
import {useEffect} from "react";
import { usePathname } from "next/navigation"



const Page = ( params  : Promise<{ params: { id: string}}>) => {
    const pathname = usePathname();
    useEffect(()=>{
        pathAppend("my-account");
    },[pathname])

    return (
        <main>User: {params.id}</main>

    )
}
export default Page
