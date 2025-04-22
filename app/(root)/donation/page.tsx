'use client'

import Payment from '@/components/Payment';
import BadgeComponent from '@/components/ui/Badge';
import ButtonComponent from '@/components/ui/ButtonComponent';
import FloatingLabelComponent from '@/components/ui/FloatingLabel';
import PaymentDetailsContainer from '@/components/ui/PaymentDetailsContainer';
import ValidateFormValues from '@/utils/helper/validateFormValues';
import { Dropdown, DropdownItem } from 'flowbite-react';
import {useEffect, useState} from 'react';


const Donation = () => {

    const [name, setName] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const [error, setError] = useState(false);
    const [checkout, setCheckout] = useState<boolean>(false);
    const handleCheck = () =>{
        const ifValid = ValidateFormValues({name, mobile, amount});
        setCheckout(ifValid);
        setError(!ifValid);
    };

    useEffect(()=>{
        setCheckout(false);
        setError(false);
    },[name, amount, mobile]);

    return(
        <div className='top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className='md:w-[50%]'>
                    <PaymentDetailsContainer heading={"Donar Details"} halfScreen={true}>
                        <FloatingLabelComponent type='text' label="Enter name" value={name} 
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />
                        <FloatingLabelComponent type='number' label="Enter mobile" value={mobile} 
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setMobile(e.target.value)} />
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
                        {error && <span className='flex justify-center'> <BadgeComponent text={"Please Enter Valid Values"} color={"danger"} onlySmall={true} /> </span> }
                        <ButtonComponent text={"Validate Details"} onClick={handleCheck} />
                    </PaymentDetailsContainer>
                </div>
                <div className='md:w-[50%]'>
                    <div className="text-center"> Payment Details </div>
                    {checkout && <Payment name={name} mobile={mobile} amount={amount} setName={setName} setMobile={setMobile} setAmount={setAmount} setCheckout={setCheckout} PaymentFor='D' />}
                </div>                                                                                                                                           
            </div>
        </div>
    );
};

export default Donation;