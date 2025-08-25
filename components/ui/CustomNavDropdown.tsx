import { Dropdown } from "flowbite-react";
import { ReactNode } from "react";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";

const CustomNavDropdown = ({label, childDropdown, children}:{label:string, childDropdown?:boolean, children:ReactNode}) => {
    const textColor = childDropdown ? "text-cyan-800" : "text-white";
    return(
        <Dropdown
            dismissOnClick={true}
            renderTrigger={()=>
                <span className={`flex text-sm ${textColor} ${childDropdown ? "px-2 py-2" : ""} hover:cursor-pointer pe-2`}>
                    {!childDropdown
                        ? <span><HiChevronDown size={20} className={`${textColor}`}/></span>
                        : <span><HiChevronLeft size={20} className={`${textColor}`}/></span>
                    }
                    <span>{label}</span>
                </span>
            }
            placement={!childDropdown ? "bottom" : "left"}
        >
            {children}
        </Dropdown>
    )
}

export default CustomNavDropdown;