import { SidebarItem } from "flowbite-react";
import Link from "next/link";
import CustomIconColor from "./CustomIconColor";


const SidebarItemComponent = ({...props}) => {
    return(
        <SidebarItem
            icon={props.icon ? CustomIconColor(props.icon, "text-white") : undefined}
            as={Link}
            href={props.href}
            onClick={props.onClick}
            onChange={props.onChange}
            className={`${props.className} text-white hover:bg-gray-800 px-0`}
        > 
            {props.text}
        </SidebarItem>
    )
}

export default SidebarItemComponent;
