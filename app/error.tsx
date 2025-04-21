'use client'
import ErrorPage from "@/components/ErrorPage"
// import ErrorPage from "../components/ErrorPage"

export default function DefaultError(){
    return(
        <ErrorPage code={401} message={"Oops, it looks like something went wrong!!!"}/>
    );
}