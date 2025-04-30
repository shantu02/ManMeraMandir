'use client'

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { AbhishekSubmitRequest, DonationSubmitRequest } from "@/app/api/supadatabase/POST";
import { Badge, Checkbox, TabItem, Tabs } from "flowbite-react";
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdQrCode } from 'react-icons/md';
import PaymentProcessing from "./Payments/PaymentProcessing";
import ValidateFormValues from "@/utils/helper/validateFormValues";



interface PaymentProps {
    name: string,
    mobile: string,
    amount?: string,
    slot?:string,
    setName: (value:string)=>void,
    setMobile: (value:string)=>void,
    setAmount?: (value:string)=>void,
    setSlot?: (value:string)=>void,
    setCheckout: (value:boolean)=>void,
    PaymentFor:string
}

  
const Payment: React.FC<PaymentProps> = ({ name, mobile, amount, slot, setName, setMobile, setAmount, setSlot, setCheckout, PaymentFor }) => {
    
    useEffect(()=>{
        const ifValid = ValidateFormValues({name, mobile, amount, slot});
        setCheckout(ifValid);
        setShowProcess(!ifValid);
    },[name, amount, mobile, slot])

    const [checkBox, setCheckBox] = useState(false);
    const [showProcess, setShowProcess] = useState(false);
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);

    const handleDonationSubmitGetStatus = async() => {
        let passAmount="";
        if(amount!=null){passAmount=amount;}
        const res = await DonationSubmitRequest({name, mobile, amount:passAmount, payMode:"cash", transactionId:""});
        return res.status;
    }
    const handleAbhishekSubmitGetStatus = async() => {
        let passSlot="";
        if(slot!=null){passSlot=slot;}
        const formatDateToCustomFormat = () => new Date(`${passSlot}:00`).getTime() ? `${new Date(`${passSlot}:00`).getDate().toString().padStart(2, '0')}-${(new Date(`${passSlot}:00`).getMonth() + 1).toString().padStart(2, '0')}-${new Date(`${passSlot}:00`).getFullYear()} ${((new Date(`${passSlot}:00`).getHours() % 12) || 12)}:${String(new Date(`${passSlot}:00`).getMinutes()).padStart(2, '0')} ${new Date(`${passSlot}:00`).getHours() >= 12 ? 'PM' : 'AM'}` : 'Invalid date';
        const res = await AbhishekSubmitRequest({name, mobile, payMode:"upi", transactionId:"", slot:formatDateToCustomFormat()});
        return res.status;
    }

    const handleCashPayment = async() => {
        setShowProcess(true);
        if(PaymentFor=='D'){
            const dsrResult = await handleDonationSubmitGetStatus();
            if(dsrResult==201){ setError(false); }
            else{ setError(true); }
        }
        else{
            const asrResult = await handleAbhishekSubmitGetStatus();
            if(asrResult==201){ setError(false); }
            else{ setError(true); }
        }
        return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleUPIPayment = () => {
        setShowProcess(true);
        return;
    }


    return (
        <Tabs aria-label="Payment Tabs" variant="underline">
            <TabItem title={"CASH"} icon={FaMoneyBillWave}>
                <div className="flex flex-col items-center justify-center">
                    { !showProcess
                        ?
                        <>
                            <div className="text-center text-xl">
                                CASH
                            </div>
                            <div className="flex flex-col w-fit p-2 text-md">
                                {name && <div className="my-1 p-2"> Name : <span className="text-center bg-gray-300 rounded p-1"> {name} </span> </div>}
                                {amount && <div className="my-1 p-2"> Amount: <span className="text-center bg-gray-300 rounded p-1">{amount}</span> </div>}
                                {slot && <div className="my-1 p-2"> Slot: <span className="text-center bg-gray-300 rounded p-1">{slot}</span> </div>}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge color={checkBox?"success":"warning"} className="text-lg"> Cash Received? </Badge>
                                <Checkbox className="h-10 w-10" onChange={()=>{setCheckBox(!checkBox)}} />
                            </div>
                            <div className="my-2">
                                { checkBox && <ButtonComponent onClick={handleCashPayment} text={PaymentFor=='D' ? "Submit Donation" : "Book Abhishek"} /> }
                            </div>
                        </>
                        :
                        <>
                            <PaymentProcessing 
                                name={name} mobile={mobile} amount={amount} slot={slot} pending={pending} error={error} setName={setName} setMobile={setMobile} setAmount={setAmount} setSlot={setSlot} setPending={setPending} setError={setError} setShowProcess={setShowProcess}
                            />
                        </>
                    }
            </div>
            </TabItem>
            <TabItem title={"QR Pay"} icon={MdQrCode}>
                <div>
                    <div className="text-center text-lg">QR Pay</div>

                </div>
            </TabItem>
        </Tabs>
    )
}

export default Payment;