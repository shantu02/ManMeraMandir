'use client'

import Payment from '@/components/Payment';
import FloatingLabelComponent from '@/components/ui/FloatingLabel';
import PaymentDetailsContainer from '@/components/ui/PaymentDetailsContainer';
import { Dropdown, DropdownItem } from 'flowbite-react';
import {useState} from 'react';


const Donation = () => {

    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    return(
        <div className='top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className='md:w-[50%]'>
                <PaymentDetailsContainer heading={"Donar Details"} halfScreen={true}>
                    <FloatingLabelComponent type='text' label="Enter name" value={name} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value); }} />
                    <FloatingLabelComponent type='number' label="Enter mobile" value={mobile} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setMobile(e.target.value);}} />
                    <div className="flex col-1">
                        <FloatingLabelComponent type='number' label="Enter amount" value={amount}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAmount(e.target.value);}} />
                        <Dropdown label="" dismissOnClick={true} className='w-fit'>
                            <DropdownItem onClick={()=>setAmount("101")}>Rs. 101</DropdownItem>
                            <DropdownItem onClick={()=>setAmount("151")}>Rs. 151</DropdownItem>
                            <DropdownItem onClick={()=>setAmount("251")}>Rs. 251</DropdownItem>
                            <DropdownItem onClick={()=>setAmount("501")}>Rs. 501</DropdownItem>
                        </Dropdown>
                    </div>
                </PaymentDetailsContainer>
            </div>
            <Payment name={name} mobile={mobile} amount={amount} ritualId="" slot="" setName={setName} setMobile={setMobile} setAmount={setAmount} setRitualId={(()=>{})} setSlot={(()=>{})} PaymentFor='D' />
            </div>
        </div>
    );
};

export default Donation;