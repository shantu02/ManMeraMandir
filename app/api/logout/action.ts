'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Logout(){
    console.log("comming here 1")
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((cookie)=>{
        cookieStore.delete(cookie.name);
    })
    console.log("comming here 2")
    redirect("/login");
}