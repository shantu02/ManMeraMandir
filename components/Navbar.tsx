
'use client'

import {
    Dropdown,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
  } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Logout from "@/app/api/logout/action";

export default function NavigationMenu() {

    const [active, setActive] = useState<string|null>(null);

    const handleLogout = ()=>{
        setActive(null);
        console.log("coming here")
        Logout();
    }

    return (
        <Navbar fluid rounded>
            <NavbarBrand href="/home">
                {/* <img src="/om.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <Image src={"/om.png"} height={40} width={40} alt={"ॐ"}/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Man Mera Mandir</span>
            </NavbarBrand>

            <Dropdown label="Services" dismissOnClick={true} className="md:hidden bg-white text-black focus:bg-white hover:bg-white hover:cursor-pointer">
                <DropdownItem className="bg-gray-100">
                    <Link href={"/donation"}> Donation </Link>
                </DropdownItem>
                <DropdownItem className="bg-gray-100">
                    <Link href={"/abhishek"}> Abhishek </Link>
                </DropdownItem>
                <DropdownItem className="bg-gray-100">
                    <Link href={"/home"}> Assest Donation </Link>
                </DropdownItem>
                <DropdownItem className="bg-gray-100">
                    <Link href={"#"} onClick={handleLogout}> Signout </Link>
                </DropdownItem>
            </Dropdown>

            <NavbarCollapse>
                <Link href={"/donation"} className={active=="D"?"text-blue-500":"text-black"} onClick={()=>{setActive("D");}}>
                    Donation
                </Link>
                <Link href={"/abhishek"} className={active=="A"?"text-blue-500":"text-black"} onClick={()=>{setActive("A");}}>
                    Abhishek
                </Link>
                <Link href={"/assestdonation"} className={active=="AD"?"text-blue-500":"text-black"} onClick={()=>{setActive("AD");}}>
                    Assest Donation
                </Link>
                <Link href={"#"} onClick={handleLogout}>
                    Signout
                </Link>
            </NavbarCollapse> 
        </Navbar>
      );
}
