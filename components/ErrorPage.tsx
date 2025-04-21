'use client'

import ButtonComponent from "@/components/ui/ButtonComponent";
// import ButtonComponent from "./ui/ButtonComponent";
import { ErrorType } from "@/types/error_type";
// import { ErrorType } from "../types/error_type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";


interface ErrorPageProps {
  error: ErrorType;
}

export default function ErrorPage({error}:ErrorPageProps){

    const pathName = usePathname();
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = () => setLoading(true);
    
      useEffect(() => {
        setLoading(false);
      }, [pathName]);

    return(
        <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="text-6xl px-2 py-3 text-center"> {error.code}</div>
            <div className="text-xl px-2 py-3 text-center"> {error.message}</div>
            <div className="my-2 px-2 py-1">
                <Link href={"/home"} onClick={handleClick}>
                    <ButtonComponent text={"Go to Homepage"} />
                </Link>
            </div>
            { loading && <Spinner size="medium" show={true}>Loading...</Spinner> }
        </div>
    )
}