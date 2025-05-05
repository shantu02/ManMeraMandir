'use client'
import {useState} from 'react'
import FloatingLabelComponent from '../ui/FloatingLabel';

const AdhaarNumber = (
    {
        setAdhaarNumber, adhaarNumber
    }:{
        setAdhaarNumber:(v:string[])=>void, adhaarNumber:string[]
    }
) => {

    const [adhaar01, setAdhaar01]  = useState(adhaarNumber[0]);
    const [adhaar02, setAdhaar02]  = useState(adhaarNumber[1]);
    const [adhaar03, setAdhaar03]  = useState(adhaarNumber[2]);

    const adhaarInputCheck = (v:string) => {
        return (v=="" || (parseInt(v)>0 && v.length<=4));
    }

    const handleAdhaar01Change = (v:string) => {
        if(adhaarInputCheck(v)){
            setAdhaar01(v);
            setAdhaarNumber([v, adhaar02??"0000", adhaar03??"0000"]);
        }
    };
    const handleAdhaar02Change = (v:string) => {
        if(adhaarInputCheck(v)){
            setAdhaar02(v);
            setAdhaarNumber([adhaar01??"0000", v, adhaar03??"0000"]);
        }
    };
    const handleAdhaar03Change = (v:string) => {
        if(adhaarInputCheck(v)){
            setAdhaar03(v);
            setAdhaarNumber([adhaar01??"0000", adhaar02??"0000", v]);
        }
    };

    return (
        <div className="">
            <span className="text-gray-500">Addhar Number</span>
            <div className="flex gap-5 mt-2">
                <FloatingLabelComponent placeholder={"XXXX"} type={"number"} min={"1000"} max={"9999"} className={"text-sm lg:text-lg text-nowrap text-center"} value={adhaar01} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleAdhaar01Change(e.target.value)}} />
                <FloatingLabelComponent placeholder={"XXXX"} type={"number"} min={"1000"} max={"9999"} className={"text-sm lg:text-lg text-nowrap text-center"} value={adhaar02} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleAdhaar02Change(e.target.value)}} />
                <FloatingLabelComponent placeholder={"XXXX"} type={"number"} min={"1000"} max={"9999"} className={"text-sm lg:text-lg text-nowrap text-center"} value={adhaar03} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleAdhaar03Change(e.target.value)}} />
            </div>
        </div>
    )
}

export default AdhaarNumber;