/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { BusinessPeopleSubmitRequest, PanditSubmitRequest } from "@/app/api/supadatabase/POST";
import AdhaarNumber from "@/components/Common/AdhaarNumber";
import MobileNumber from "@/components/Common/MobileNumber";
import RecordProcessing from "@/components/Common/RecordProcessing";
import BadgeComponent from "@/components/ui/Badge";
import ButtonComponent from "@/components/ui/ButtonComponent";
import FloatingLabelComponent from "@/components/ui/FloatingLabel";
import { ValidatePersonAddFormValues } from "@/utils/helper/validateFormValues";
import { Checkbox, Dropdown, DropdownItem, Textarea } from "flowbite-react";
import { useState } from "react";


const RegisterPerson = () => {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [adhaarNumber, setAdhaarNumber]  = useState<string[]>(["", "", ""]);
    const [personType, setPersonType] = useState("priest");
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


    const handleTryAgain = () => {
        setPending(false);
        setSuccess(false);
        setError("");
    }

    const handleSuccess = () =>{
        setName("");
        setMobile("");
        setAdhaarNumber(["", "", ""]);
        setPersonType("priest");
        setBusinessName("");
        setBusinessAddress("");
        setPending(false);
        setSuccess(false);
        setError("");
    }

    const handleRegisterPerson = async() => {
        setPending(true);
        const adhaar = adhaarNumber.join("");
        setError("");
        if(ValidatePersonAddFormValues({name, mobile, adhaar, businessName, businessAddress, personType})){
            const res = await BusinessPeopleSubmitRequest({name, mobile, adhaar, businessName, businessAddress, personType});
            if(res.status == 201){
                setError("");
                setSuccess(true)
            }
            else if(res.status == 409){
                setError("Duplicate Adhaar Number is Found!!");
                setSuccess(false)
            }
            else{
                setError("Please Enter Valid Values!!");
                setSuccess(false)
            }
        }
        else{
            setError("Please Enter Valid Values!!");
        }
        setPending(false);
    }

    return(
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-between gap-5 w-full md:w-xl p-5">
            <div className="px-10 m-5 text-xl text-center"> ADD PERSON </div>
                <FloatingLabelComponent label={"Name"} value={name} required={true} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />
                <MobileNumber mobileNumber={mobile} setMobileNumber={setMobile} required />
                <AdhaarNumber adhaarNumber={adhaarNumber} setAdhaarNumber={setAdhaarNumber} />
                <div className="flex justify-center m-2">
                    <Dropdown label={personType.toUpperCase()} className="text-nowrap px-4 text-md" color={"default"}>
                        <DropdownItem className="text-md" onClick={()=>{setPersonType("priest")}}>
                            <Checkbox checked={personType=="priest"} readOnly className="p-2" /> 
                            <span className="p-2">Priest</span>
                        </DropdownItem>
                        <DropdownItem className="text-md" onClick={()=>{setPersonType("staff")}}>
                            <Checkbox checked={personType=="staff"} readOnly className="p-2" /> 
                            <span className="p-2">Staff</span>
                        </DropdownItem>
                        <DropdownItem className="text-md" onClick={()=>{setPersonType("vendor")}}>
                            <Checkbox checked={personType=="vendor"} readOnly className="p-2" /> 
                            <span className="p-2">Vendor</span>
                        </DropdownItem>
                    </Dropdown>
                </div>
                {
                    personType=="vendor" && 
                    <>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <label> <span className="font-bold text-gray-500"> Business Type * </span> </label>
                            <Textarea className="text-sm md:text-lg" value={businessName}
                                rows={1} placeholder="Enter business type"
                                onChange={(e)=>{setBusinessName(e.target.value)}}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <label> <span className="font-bold text-gray-500"> Business Address * </span> </label>
                            <Textarea className="text-sm md:text-lg" value={businessAddress}
                                rows={5} placeholder="Enter business details"
                                onChange={(e)=>{setBusinessAddress(e.target.value)}}
                            />
                        </div>
                    </>
                }
                {
                    pending || success || error
                    ? <RecordProcessing pending={pending} success={success} error={error} handleSuccess={handleSuccess} handleTryAgain={handleTryAgain} />
                    : <ButtonComponent text={"Add Person"} onClick={handleRegisterPerson} />
                }
            </div>
        </div>
    )
}

export default RegisterPerson;