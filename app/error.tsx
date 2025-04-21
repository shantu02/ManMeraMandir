'use client'
import ErrorPage from "@/components/ErrorPage"
import { ErrorType } from "@/types/error_type";

export default function DefaultError(){
    
    const errorObj:ErrorType = {
        code: 404,
        message: "Oops, it looks like something went wrong!!!"
    };

    return(
        <ErrorPage error={errorObj} />
    );
}