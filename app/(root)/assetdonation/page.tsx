'use client'

import { useState } from "react";
import PaymentDetailsContainer from "@/components/Payments/PaymentDetailsContainer";
import FloatingLabelComponent from "@/components/ui/FloatingLabel";
import { Textarea } from "flowbite-react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { AsssetDonationSubmitRequest } from "@/app/api/supadatabase/POST";
import PaymentProcessing from "@/components/Payments/PaymentProcessing";
import {ValidateFormValues} from "@/utils/helper/validateFormValues";
import BadgeComponent from "@/components/ui/Badge";
import MobileNumber from "@/components/Common/MobileNumber";

const AssestDonation = () => {
    
    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [showProcess, setShowProcess] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);


    const handleDetails = async() => {
        setPending(true);
        if(ValidateFormValues({name, mobile, description})){
            setShowProcess(true);
            const result = await AsssetDonationSubmitRequest({name, mobile, description});
            setPending(false);
            if(result.status==201){ setError(false); }
            else{ setError(true); }
        }
        else{
            setError(true);
            setShowProcess(false);
        }
    }

    return (
        <>
            <PaymentDetailsContainer heading={"Assest Donar Details"} halfScreen={false}>
                {!showProcess
                    ?
                    <>
                        <FloatingLabelComponent type='text' label="Enter name" required={true} value={name} 
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value); }} />
                        <MobileNumber mobileNumber={mobile} setMobileNumber={setMobile} />
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <label> <span className="font-bold text-gray-500"> Assest Description *</span> </label>
                            <Textarea className="text-sm md:text-lg" value={description}
                                rows={5} placeholder="Enter assest details"
                                onChange={(e)=>{setDescription(e.target.value)}}
                            />
                        </div>
                        {error && <span className='flex justify-center'> <BadgeComponent text={"Please Enter Valid Values"} color={"danger"} onlySmall={true} /> </span> }
                        <ButtonComponent text={"Add Details"} onClick={handleDetails} />
                    </>
                    :
                    <PaymentProcessing 
                        name={name} mobile={mobile} description={description} pending={pending} error={error} setName={setName} setMobile={setMobile} setDescription={setDescription} setPending={setPending} setError={setError} setShowProcess={setShowProcess}
                    />
                }
            </PaymentDetailsContainer>
            
        </>
    )
}

export default AssestDonation;