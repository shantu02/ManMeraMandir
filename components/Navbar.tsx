
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
import { useUser } from "@/context/UserRoleProvider";

export default  function NavigationMenu() {

    const [active, setActive] = useState<string|null>(null);
    const {admin} = useUser();

    const handleLogout = ()=>{
        setActive(null);
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
                    <Link href={"/assetdonation"}> Asset Donation </Link>
                </DropdownItem>
                {
                    admin &&
                    <Dropdown label="Admin" dismissOnClick={true} className="bg-gray-100 text-gray-700 focus:bg-white hover:bg-white hover:cursor-pointer p-4 ms-0 flex justify-start w-full">
                        <DropdownItem className="bg-gray-100">
                            <Link href={"/data-info"}> Data Point </Link>
                        </DropdownItem>
                    </Dropdown>
                }
                <DropdownItem className="bg-gray-100">
                    <Link href={"#"} onClick={handleLogout}> Signout </Link>
                </DropdownItem>
            </Dropdown>

            <NavbarCollapse>
                <Link href={"/donation"} className={`${active=="D"?"text-blue-500":"text-black"} flex items-center`} onClick={()=>{setActive("D");}}>
                    Donation
                </Link>
                <Link href={"/abhishek"} className={`${active=="A"?"text-blue-500":"text-black"} flex items-center`} onClick={()=>{setActive("A");}}>
                    Abhishek
                </Link>
                <Link href={"/assetdonation"} className={`${active=="AD"?"text-blue-500":"text-black"} flex items-center`} onClick={()=>{setActive("AD");}}>
                    Asset Donation
                </Link>
                { 
                    admin && 
                    <Dropdown label="Admin" dismissOnClick={true} className="bg-white text-black focus:bg-white hover:bg-white hover:cursor-pointer p-0 ms-0">
                        <DropdownItem className="bg-gray-100">
                            <Link href={"/data-info"}> Data Point </Link>
                        </DropdownItem>
                    </Dropdown>
                }
                <Link href={"#"} onClick={handleLogout} className="flex items-center">
                    Signout
                </Link>
            </NavbarCollapse> 
        </Navbar>
      );
}
