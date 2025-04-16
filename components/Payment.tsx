'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { AbhishekSubmitRequest, DonationSubmitRequest } from "@/app/api/supadatabase/POST";
import { Badge, Checkbox, TabItem, Tabs } from "flowbite-react";
import Image from "next/image";
import ImageToIcon from "./ImageToIcon";
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdQrCode } from 'react-icons/md';
import Link from "next/link";



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
    
    const performChecks = () => {
        let check = name && amount && !showGif && (mobile=="" || mobile=="0" || mobile.length==10);
        if(PaymentFor=='A'){
            check = check && slot.length>1;
        }
        return check;
    }


    return (

        <Tabs aria-label="Payment Tabs" variant="underline" className="md:w-[75%]">
            <TabItem title={"CASH"} icon={FaMoneyBillWave}>
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center text-xl">CASH</div>
                    {
                        performChecks()
                        ?
                        <>
                            <div className="flex flex-col w-fit p-2 text-md">
                                {name && <div className="my-1 p-2"> Name : <span className="text-center bg-gray-300 rounded p-1"> {name} </span> </div>}
                                {amount && <div className="my-1 p-2"> Money: <span className="text-center bg-gray-300 rounded p-1">{amount}</span> </div>}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge color={checkBox?"success":"warning"} className="text-lg"> Cash Received? </Badge>
                                <Checkbox className="h-10 w-10" onChange={()=>{setCheckBox(!checkBox)}} />
                            </div>
                            <div className="my-2">
                                {
                                    checkBox &&
                                        <Button className="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                        onClick={handleCashPayment}
                                        >
                                            Submit Donation
                                        </Button>
                                }
                            </div>
                        </>
                        :
                        showGif
                        ?
                        <>
                            <Image src={"/greenTick.gif"} width={100} height={100} alt="Payment Success" />
                            <Button className="w-fit hover:cursor-pointer text-xl bg-green-600 text-white" onClick={handleDonePayment}> Done </Button>
                        </>
                        :
                        <>
                            <Badge color="warning" className="text-xl">
                                <div className="my-2">Please Enter Name and Amount {PaymentFor=='A'&&"and Slot"} for donation!!!</div>
                                <div className="my-2">If adding number, It should be 10 digit number!!!</div>
                            </Badge>
                        </>
                    }
                </div>
            </TabItem>
            <TabItem title={"UPI"} icon={MdQrCode}>
                <div>
                    <div className="text-center text-lg">UPI</div>

                </div>
            </TabItem>
        </Tabs>
    )
}

export default Payment;