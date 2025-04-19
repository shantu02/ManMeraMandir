'use client'

import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";



const DateTimePickerComponent = ({setDateTime}:{setDateTime:(value:string)=>void}) => {

    const [time, setTime] = useState<string>("09:00");
    const [date, setDate] = useState<Date>(new Date());

    useEffect(()=>{
        setDateTime(date?.toDateString()+" "+time);
    }, [date, time, setDateTime]);

    return(
        <div className="flex flex-row md:flex-col items-center">
            <Datepicker className="w-fit"
                minDate={new Date()}
                onChange={(e)=>{setDate(e!);}}
            />
            <input type="time" id="time" 
                className="w-fit bg-gray-50 border leading-none border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required defaultValue={"09:00"}
                onChange={(e)=>{setTime(e.target.value);}}
            />
        </div>
    )
}

export default DateTimePickerComponent;

