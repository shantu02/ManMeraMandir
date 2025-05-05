'use client'

import FloatingLabelComponent from "../ui/FloatingLabel";

const MobileNumber = (
    {
        setMobileNumber, mobileNumber, required=false
    }:{
        setMobileNumber:(v:string)=>void, mobileNumber:string, required?:boolean
    }
) => {

    const handleMobileNumber = (v:string) => {
        setMobileNumber(v.replace(/\D/g, "").slice(0, 10));
    }

    return(
        <FloatingLabelComponent 
            label={"Enter Mobile"} 
            type={"number"}
            value={mobileNumber}
            onChange={((e:React.ChangeEvent<HTMLInputElement>)=>handleMobileNumber(e.target.value))}
            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>{
                if(['e', 'E', '+', '-', '.'].includes(e.key)){
                    e.preventDefault();
                }
            }}
            required={required}
        />
    )
}

export default MobileNumber;