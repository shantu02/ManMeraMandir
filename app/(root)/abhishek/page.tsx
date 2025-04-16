'use client';

import {useEffect, useState} from 'react';
import {FloatingLabel, Dropdown, DropdownItem} from 'flowbite-react';
import { GetRituals } from '@/app/api/supadatabase/GET';
import { Spinner } from '@/components/ui/Spinner';
import Payment from '@/components/Payment';

// eslint-disable-next-line @next/next/no-async-client-component
const Abhishek = () => {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [abhishek, setAbhishek] = useState("Select");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ritualId, setRitualId] = useState("");
    const [amount, setAmount] = useState("");
    const [slot, setSlot] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ritualsData, setRitualsData] = useState<any[]>([]);
    const [spin, setSpin] = useState(true);

    useEffect(()=>{
        const loadRituals = async() => {
            try{
                const data = await GetRituals();
                setRitualsData(data!);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setSpin(false);
            }
        }
        loadRituals();
    },[]);

    return(
        <div className='relative top-20 w-full bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className='flex flex-col gap-2 border-gray-300 border-r-2 p-10 md:w-[75%]'>
                    <div className='text-center text-2xl'> Abhishek </div>
                    <div className='my-2'>
                        <FloatingLabel className='text-purple-800 text-lg' type='text' value={name===undefined?"":name} variant="filled" label="Enter name" onChange={(e)=>{setName(e.target.value);}} />
                    </div>
                    <div className='my-2'>
                        <FloatingLabel className='text-purple-800 text-lg' type='number' value={mobile===undefined?"":mobile} variant="filled" label="Enter mobile" onChange={(e)=>{setMobile(e.target.value);}} />
                    </div>
                    <div className=''>
                         <FloatingLabel className='text-purple-800 text-lg' type='text' value={abhishek} variant="filled" label="Selected Abhishek"  disabled/>
                         {ritualsData.length>0 && 
                            <div className='flex justify-center my-2'>
                                <Dropdown label="Select One" dismissOnClick={true} value={abhishek} className='mb-1'>
                                    {
                                        ritualsData.map(element => 
                                            <DropdownItem key={element.ritual_id} onClick={()=>{
                                                setAmount(element.ritual_amount);
                                                setAbhishek(element.ritual_name);
                                                setRitualId(element.ritual_id);
                                            }}> {element.ritual_name} </DropdownItem>
                                        )                        
                                    }
                                    <DropdownItem onClick={()=>{
                                        setAmount("0");
                                        setAbhishek("Custom");
                                        setRitualId("-");
                                    }}> Custom </DropdownItem>                                            
                                </Dropdown>
                            </div>
                        }
                        {
                            abhishek=="Custom" &&
                            <FloatingLabel className='text-purple-800 text-lg' type='number' value={amount===undefined?"":amount} label='Select Amount' variant='filled' onChange={(e)=>{setAmount(e.target.value)}}/>
                        }
                    </div>
                    <div>
                        <input type="datetime-local" name="dateTimePicker" value={slot.replace(':00Z','')} 
                            className="w-full p-3 mb-2 bg-white border border-gray-300 rounded-lg shadow-focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-purple-800"
                            placeholder="Select Date and Time" onChange={(e)=>{
                                console.log("Change : ", e.target.value);
                                setSlot(e.target.value + ':00Z');
                            }}
                        />
                    </div>
                </div>
                <Payment name={name} mobile={mobile} amount={amount} ritualId={ritualId} slot={slot} setName={setName} setMobile={setMobile} setAmount={setAmount} setRitualId={setRitualId} setSlot={setSlot} PaymentFor='A' />
            </div>
            {spin && <Spinner />}
        </div>
    )
}

export default Abhishek;