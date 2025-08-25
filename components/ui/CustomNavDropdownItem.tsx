import { DropdownItem } from "flowbite-react"
import Link from "next/link";

const CustomNavDropdownItem = ({label, href}:{label:string, href:string}) => {
    return(
        <DropdownItem className="focus:bg-transparent hover:text-gray-900 text-cyan-800">
            <Link href={href}>{label}</Link>
        </DropdownItem>
    )
}

export default CustomNavDropdownItem;