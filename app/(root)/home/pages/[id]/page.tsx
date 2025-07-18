"use client";
import React, { useEffect } from "react";
import pathAppend from "@/app/utils/utils";
import { usePathname } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const pathname = usePathname();

  useEffect(() => {
    pathAppend("my-account");
  }, [pathname]);

  return <main>User: {params.id}</main>;
};

export default Page;
