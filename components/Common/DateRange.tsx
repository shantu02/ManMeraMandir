'use client'

import { Datepicker } from "flowbite-react"

interface DateRangeType {
    startDate: Date,
    endDate: Date,
    setStartDate: (v:Date)=>void,
    setEndDate: (v:Date)=>void,
}

const DateRange = ({startDate, endDate, setStartDate, setEndDate}:DateRangeType) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 justify-end items-center text-sm px-5">
            <span>Date Range:</span>
            <Datepicker value={startDate} onChange={(e)=>{setStartDate(e!)}} showClearButton={false} maxDate={endDate} />
            <span>from</span>
            <Datepicker value={endDate} onChange={(e)=>{setEndDate(e!)}} showClearButton={false} minDate={startDate} />
        </div>
    )
}

export default DateRange;