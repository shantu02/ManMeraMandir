'use client'

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/Button";
import { AbhishekSubmitRequest, DonationSubmitRequest } from "@/app/api/supadatabase/POST";
// import { AbhishekSubmitRequest, DonationSubmitRequest } from "../app/api/supadatabase/POST";
import { Badge, Checkbox, TabItem, Tabs } from "flowbite-react";
import Image from "next/image";
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdQrCode } from 'react-icons/md';



interface PaymentProps {
    name: string,
    mobile: string,
    amount: string,
    ritualId:string,
    slot:string,
    setName: (value:string)=>void,
    setMobile: (value:string)=>void,
    setAmount: (value:string)=>void,
    setRitualId: (value:string)=>void,
    setSlot: (value:string)=>void,
    PaymentFor:string
}

  
const Payment: React.FC<PaymentProps> = ({ name, mobile, amount, ritualId, slot, setName, setMobile, setAmount, setRitualId, setSlot, PaymentFor }) => {

    const [payMode, setPayMode] = useState("");
    const [checkBox, setCheckBox] = useState(false);
    const [showGif, setShowGif] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState(true);

    useEffect(()=>{
        if(name.length==0){setError(true);}
        if(mobile.length==0 || mobile.length!=10){setError(true);}
        if(amount.length==0 || parseInt(amount)<=0){setError(true);}
        if(slot.length==0){setError(true);}
    },[name, amount, mobile, slot])

    const handlePayment = async () =>{
        if(PaymentFor=='D'){
            console.log(amount);
            const dsrResult = await DonationSubmitRequest({name, mobile, amount, payMode, transactionId:""});
            console.log(dsrResult);
        }
        else{
            const formatDateToCustomFormat = () => new Date(`${slot}:00`).getTime() ? `${new Date(`${slot}:00`).getDate().toString().padStart(2, '0')}-${(new Date(`${slot}:00`).getMonth() + 1).toString().padStart(2, '0')}-${new Date(`${slot}:00`).getFullYear()} ${((new Date(`${slot}:00`).getHours() % 12) || 12)}:${String(new Date(`${slot}:00`).getMinutes()).padStart(2, '0')} ${new Date(`${slot}:00`).getHours() >= 12 ? 'PM' : 'AM'}` : 'Invalid date';

            const asrResult = await AbhishekSubmitRequest({name, mobile, amount, payMode, transactionId:"TX0000010", ritualId, slot:formatDateToCustomFormat()});
            console.log(asrResult);
        }
    }

    const handleCashPayment = () => {
        setPayMode("cash");
        setShowGif(true);
        return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleUPIPayment = () => {
        setPayMode("upi");
        setShowGif(true);
        return;
    }

    const handleDonePayment = async () => {
        const res = await handlePayment();
        console.log(res);
        setName("");
        setMobile("");
        setAmount("");
        setRitualId("");
        setSlot("");
        setPayMode("");
        setCheckBox(false);
        setShowGif(false);
    }

    return (
        <Tabs aria-label="Payment Tabs" variant="underline">
            <TabItem title={"CASH"} icon={FaMoneyBillWave}>
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center text-xl">
                        CASH
                    </div>
                    <div className="flex flex-col w-fit p-2 text-md">
                        {name && <div className="my-1 p-2"> Name : <span className="text-center bg-gray-300 rounded p-1"> {name} </span> </div>}
                        {amount && <div className="my-1 p-2"> Money: <span className="text-center bg-gray-300 rounded p-1">{amount}</span> </div>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge color={checkBox?"success":"warning"} className="text-lg"> Cash Received? </Badge>
                        <Checkbox className="h-10 w-10" onChange={()=>{setCheckBox(!checkBox)}} />
                    </div>
                    <div className="my-2">
                        { checkBox && <ButtonComponent onClick={handleCashPayment} text={PaymentFor=='D' ? "Submit Donation" : "Book Abhishek"} /> }
                    </div>
                    {
                    showGif &&
                    <>
                        <Image src={"/greenTick.gif"} width={100} height={100} alt="Payment Success" />
                        <ButtonComponent onClick={handleDonePayment} text={"Done"} />
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