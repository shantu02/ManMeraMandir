'use client'
import Payment from '@/components/Payment';
import { Dropdown, DropdownItem, FloatingLabel } from 'flowbite-react';
import {useState} from 'react';

const Donation = () => {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [amount, setAmount] = useState("");

    return(
        <div className='relative top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className='flex flex-col gap-2 border-gray-300 border-r-2 p-10 md:w-[75%]'>
                    <div className='text-center text-2xl'> Donation </div>
                    <div className='my-2'>
                        <FloatingLabel className='text-purple-800 text-lg' type='text' value={name===undefined?"":name} variant="filled" label="Enter name" onChange={(e)=>{setName(e.target.value);}} />
                    </div>
                    <div className='my-2'>
                        <FloatingLabel className='text-purple-800 text-lg' type='number' value={mobile===undefined?"":mobile} variant="filled" label="Enter mobile" onChange={(e)=>{setMobile(e.target.value);}} />
                    </div>
                    <div className='flex flex-col justify-between items-center my-2 gap-1'>
                        <div className='w-full'>
                            <FloatingLabel className='text-purple-800 text-lg' type='number' value={amount===undefined?"":amount} variant="filled" label="Enter amount" onChange={(e)=>{setAmount(e.target.value);}} />
                        </div>
                        <div className='flex justify-center w-full'>
                            <Dropdown label="Select Amount" dismissOnClick={false} className='w-[50%]'>
                                <DropdownItem onClick={()=>setAmount("501")}>501</DropdownItem>
                                <DropdownItem onClick={()=>setAmount("1001")}>1001</DropdownItem>
                                <DropdownItem onClick={()=>setAmount("1501")}>1501</DropdownItem>
                                <DropdownItem onClick={()=>setAmount("2001")}>2001</DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <Payment name={name} mobile={mobile} amount={amount} ritualId="" slot="" setName={setName} setMobile={setMobile} setAmount={setAmount} setRitualId={(()=>{})} setSlot={(()=>{})} PaymentFor='D' />
            </div>
        </div>
    );
};

export default Donation;