'use client';

import {useEffect, useState} from 'react';
import Payment from '@/components/Payment';
import PaymentDetailsContainer from '@/components/ui/PaymentDetailsContainer';
import FloatingLabelComponent from '@/components/ui/FloatingLabel';
import DateTimePickerComponent from '@/components/ui/DateTimePicker';
import ButtonComponent from '@/components/ui/ButtonComponent';
// import ButtonComponent from '../../../components/ui/ButtonComponent';



const Abhishek = () => {
    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [slot, setSlot] = useState<string>("");

    useEffect(()=>{
        console.log(slot);
    }, [slot]);

    const [checkout, setCheckout] = useState<boolean>(false);
    const handleCheck = () =>{
        return (name.length<=1 || ![0,10].includes(mobile.length) || amount.length==0 || slot.length==0)
        ? setCheckout(false)
        : setCheckout(true);
    }

    return(
        <div className='top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className='md:w-[50%]'>
                    <PaymentDetailsContainer heading={"Abhishek"} halfScreen={true}>
                        <FloatingLabelComponent type={"text"} label={"Enter name"} value={name}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value);}}
                        />
                        <FloatingLabelComponent type={"number"} label={"Enter mobile"} value={mobile}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setMobile(e.target.value);}}
                        />
                        <div className="flex flex-col items-center justify-center">
                            <label> Slot (Date Time): </label>
                            <DateTimePickerComponent setDateTime={setSlot}/>
                        </div>
                        <ButtonComponent text={"Validate Details"} onClick={handleCheck} />
                    </PaymentDetailsContainer>
                </div>
                <div className='md:w-[50%]'>
                    <div className="text-center my-1">
                        {checkout ? "Payment Details" : "Revalidate form"}
                    </div>
                    {checkout && <Payment name={name} mobile={mobile} amount={amount} ritualId="" slot="" setName={setName} setMobile={setMobile} setAmount={setAmount} setRitualId={(()=>{})} setSlot={(()=>{})} PaymentFor='D' />}
                </div>
            </div>
        </div>
    )
}

export default Abhishek;