'use client'

import { useState } from "react";
import PaymentDetailsContainer from "@/components/ui/PaymentDetailsContainer";
import FloatingLabelComponent from "@/components/ui/FloatingLabel";
// import Payment from "@/components/Payment";
import { Textarea } from "flowbite-react";


const AssestDonation = () => {
    
    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    return (
        <PaymentDetailsContainer heading={"Assest Donar Details"} halfScreen={false}>
            <FloatingLabelComponent type='text' label="Enter name" value={name} 
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value); }} />
            <FloatingLabelComponent type='number' label="Enter mobile" value={mobile} 
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setMobile(e.target.value);}} />
            <div className="flex flex-col gap-2 items-center justify-center">
                <label> Assest Description: </label>
                <Textarea className="text-sm md:text-lg" value={description}
                    rows={5} placeholder="Enter assest details"
                    onChange={(e)=>{setDescription(e.target.value)}}
                />
            </div>
        </PaymentDetailsContainer>
        // <div className='top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
        //     <div className="flex flex-col md:flex-row justify-between gap-2">
        //         <div className='md:w-[50%]'>
                    
        //         </div>
        //     </div>
        // </div>
    )
}

export default AssestDonation;