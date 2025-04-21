'use client'

import ButtonComponent from "./ui/Button";
import { ErrorType } from "../types/error_type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Spinner } from "./ui/Spinner";


export default function ErrorPage(error:ErrorType){

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = () => setLoading(true);
    
      useEffect(() => {
        const handleComplete = () => setLoading(false);
    
        router.events?.on('routeChangeComplete', handleComplete);
        router.events?.on('routeChangeError', handleComplete);
    
        return () => {
          router.events?.off('routeChangeComplete', handleComplete);
          router.events?.off('routeChangeError', handleComplete);
        };
      }, [router]);

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