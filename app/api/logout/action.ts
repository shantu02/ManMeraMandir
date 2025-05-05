'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Logout(){
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((cookie)=>{
        cookieStore.delete(cookie.name);
    })
    redirect("/login");
}