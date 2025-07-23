"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import pathAppend from "@/app/utils/utils";

const Page = () => {
  // const pathname = usePathname();
  // const id = pathname?.split("/").pop();

  // useEffect(() => {
  //   pathAppend("my-account");
  // }, [pathname]);

  return <main>User: </main>;
};

export default Page;
