'use client';

import {useState} from 'react';
import Payment from '@/components/Payment';
import PaymentDetailsContainer from '@/components/ui/PaymentDetailsContainer';
import FloatingLabelComponent from '@/components/ui/FloatingLabel';



const Abhishek = () => {
    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [slot, setSlot] = useState<string>("");

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
                        <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                            <label> Slot: </label>
                            <input type="datetime-local" name="dateTimePicker" value={slot.replace(':00Z','')} 
                                className="w-full p-3 mb-2 text-sm lg:text-lg bg-white border border-gray-300 rounded-lg shadow-focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Select Date and Time" onChange={(e)=>{
                                    console.log("Change : ", e.target.value);
                                    setSlot(e.target.value + ':00Z');
                                }}
                            />
                        </div>
                    </PaymentDetailsContainer>
                </div>
                <Payment name={name} mobile={mobile} amount={amount} ritualId="" slot="" setName={setName} setMobile={setMobile} setAmount={setAmount} setRitualId={(()=>{})} setSlot={(()=>{})} PaymentFor='D' />
            </div>
        </div>
    )
}

export default Abhishek;