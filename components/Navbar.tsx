
'use client'

import {
    Navbar,
    NavbarBrand,
    Sidebar,
    SidebarCollapse,
    SidebarItemGroup,
    SidebarItems,
  } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Logout from "@/app/api/logout/action";
import { useUser } from "@/context/UserRoleProvider";
import { HiArrowSmLeft, HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import CustomIconColor from "./ui/CustomIconColor";
import SidebarItemComponent from "./ui/SidebarItemComponent";
import CustomNavDropdown from "./ui/CustomNavDropdown";
import CustomNavDropdownItem from "./ui/CustomNavDropdownItem";
import ButtonComponent from "./ui/ButtonComponent";

export default  function NavigationMenu() {

    const [active, setActive] = useState<string|null>(null);
    const {admin} = useUser();

    const handleLogout = ()=>{
        setActive(null);
        Logout();
    }

    return (
        <Navbar className="bg-cyan-800 sm:px-1 z-2">
              
            <NavbarBrand href="/home" as={Link}>
                <Image src={"/om.png"} height={40} width={40} alt={"ॐ"}/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hidden md:block">MMM</span>
            </NavbarBrand>

            <div className="hidden md:block">
                <Sidebar aria-label="Sidebar with multi-level dropdown example"
                    theme={{root:{inner:"bg-cyan-800"}}} className="w-fit"
                >
                    <SidebarItems className="bg-cyan-800">
                        <SidebarItemGroup>
                            <SidebarItemComponent icon={HiInbox} href={"/donation"} text={"Donation"} />
                            <SidebarItemComponent icon={HiInbox} href={"/abhishek"} text={"Abhishek"} />
                            <SidebarItemComponent icon={HiUser} href={"/assetdonation"} text={"Asset Donation"} />
                        </SidebarItemGroup>
                        <SidebarItemGroup>
                            {
                                admin &&
                                <>
                                    <SidebarCollapse icon={CustomIconColor(HiChartPie,"text-white")} className="text-white hover:bg-gray-800 px-2 text-sm md:text-base" label="Analytics">
                                        <SidebarItemComponent href={"/donations-rituals"} text={"> Donations & Rituals"} />
                                        <SidebarItemComponent href={"/register-person"} text={"> Add Person"} />
                                    </SidebarCollapse>
                                    <SidebarCollapse icon={CustomIconColor(HiShoppingBag,"text-white")} className="text-white hover:bg-gray-800 px-2 text-sm md:text-base" label="Finance">
                                        <SidebarItemComponent href={"/donations-rituals"} text={"> Utility Bills"} />
                                        <SidebarItemComponent href={"/donations-rituals"} text={"> Vendor Bills"} />
                                        <SidebarItemComponent href={"/donations-rituals"} text={"> Salaries"} />
                                    </SidebarCollapse>
                                </>
                            }
                        </SidebarItemGroup>
                        <SidebarItemGroup>
                            <SidebarItemComponent icon={HiArrowSmLeft} href={"#"} text={"Signout"} onClick={handleLogout} />
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </div>

            <div className="md:hidden flex items-center">

                <CustomNavDropdown label={"Services"}>
                    <CustomNavDropdownItem label="Donation" href="/donation" />
                    <CustomNavDropdownItem label="Abhishek" href="/abhishek" />
                    <CustomNavDropdownItem label="Asset Donation" href="/assetdonation" />
                </CustomNavDropdown>

                {
                    admin &&
                    <CustomNavDropdown label="Admin">
                        <CustomNavDropdown label="Analytics" childDropdown={true}>
                            <CustomNavDropdownItem label="Donations & Rituals" href="/donations-rituals" />
                            <CustomNavDropdownItem label="Add Person" href="/register-person" />
                        </CustomNavDropdown>

                        <CustomNavDropdown label="Finance" childDropdown={true}>
                            <CustomNavDropdownItem label="Utility Bills" href="/donation" />
                            <CustomNavDropdownItem label="Vendors" href="/abhishek" />
                            <CustomNavDropdownItem label="Salaries" href="/assetdonation" />
                        </CustomNavDropdown>
                    </CustomNavDropdown>
                }
                <ButtonComponent text={"Signout"} onClick={Logout} className={"text-sm p-1"} />

            </div>
            
        </Navbar>
      );
}
