'use client';

import {useEffect, useState} from 'react';
import Payment from '@/components/Payment';
import PaymentDetailsContainer from '@/components/Payments/PaymentDetailsContainer';
import FloatingLabelComponent from '@/components/ui/FloatingLabel';
import DateTimePickerComponent from '@/components/ui/DateTimePicker';
import ButtonComponent from '@/components/ui/ButtonComponent';
import ValidateFormValues from '@/utils/helper/validateFormValues';
import BadgeComponent from '@/components/ui/Badge';



const Abhishek = () => {
    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [slot, setSlot] = useState<string>("");

    const [error, setError] = useState(false);
    const [checkout, setCheckout] = useState<boolean>(false);
    const handleCheck = () =>{
        const ifValid = ValidateFormValues({name, mobile, slot});
        setCheckout(ifValid);
        setError(!ifValid);
    }

    useEffect(()=>{
        setCheckout(false);
        setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name, slot, mobile]);

    return(
        <div className='top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className='md:w-[50%]'>
                    <PaymentDetailsContainer heading={"Abhishek"} halfScreen={true}>
                        <FloatingLabelComponent type={"text"} label={"Enter name"} value={name}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
                        />
                        <FloatingLabelComponent type={"number"} label={"Enter mobile"} value={mobile}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setMobile(e.target.value)}
                        />
                        <div className="flex flex-col items-center justify-center">
                            <label> Slot (Date Time): </label>
                            <DateTimePickerComponent setDateTime={setSlot}/>
                        </div>
                        {error && <span className='flex justify-center'> <BadgeComponent text={"Please Enter Valid Values"} color={"danger"} onlySmall={true} /> </span> }
                        <ButtonComponent text={"Validate Details"} onClick={handleCheck} />
                    </PaymentDetailsContainer>
                </div>
                <div className='md:w-[50%]'>
                    <div className="text-center my-1">
                        {checkout ? "Payment Details" : "Revalidate form"}
                    </div>
                    {checkout && <Payment name={name} mobile={mobile} slot={slot} setName={setName} setMobile={setMobile} setAmount={(()=>{})} setSlot={setSlot} setCheckout={setCheckout} PaymentFor='A' />}
                </div>
            </div>
        </div>
    )
}

export default Abhishek;