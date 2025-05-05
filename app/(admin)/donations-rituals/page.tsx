'use client'

import { GetAllRecordsForCurrentMonth, GetAllRecordsForFilter } from "@/app/api/supadatabase/GET";
import DataFilters from "@/components/Table/DataFilters";
import { Spinner } from "@/components/ui/Spinner";
import DateTimeOptions from "@/utils/DateTimeFormat/utilDateTimeFormat";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";

interface DonationsRitualsType{
    _id: bigint,
    name: string,
    created_at: Date,
    mobile: string,
    pay_mode: string,
    pay_amount: string,
    transaction_id: string,
    ritual_slot: Date,
    description: string,
    record_type: string,
}


const DonationsRituals = () => {

    const[loading, setLoading] = useState(true);
    const [dCheck, setDCheck] = useState(true);
    const [aCheck, setACheck] = useState(true);
    const [adCheck, setADCheck] = useState(true);
    const [mode, setMode] = useState("any");

    const today = new Date();
    const [startDate, setStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
    const [endDate, setEndDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth()+1, 0));

    const[data, setData] = useState<Array<DonationsRitualsType>>();

    useEffect(()=>{
        const fetchDonations = async() => {
            const res = await GetAllRecordsForCurrentMonth();
            setData(res);
            setLoading(false);
        }
    
        fetchDonations();
    },[]);

    const handleFilterMethod = () => {
        const fetchFilteredData = async() => {
            setLoading(true);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            const res = await GetAllRecordsForFilter(dCheck, aCheck, adCheck, startDate, endDate, mode);
            setData(res);
            setLoading(false);
        }
        fetchFilteredData();
    }

    useEffect(()=>{
        const fetchFilteredData = async() => {
            setLoading(true);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            const res = await GetAllRecordsForFilter(dCheck, aCheck, adCheck, startDate, endDate, mode);
            setData(res);
            setLoading(false);
        }
        fetchFilteredData();
    }, [aCheck, dCheck, adCheck, startDate, endDate, mode]);


    return (
        <div>
            <div className="px-10 m-5 text-xl"> RECORDS INFORMATION </div>
            <DataFilters dCheck={dCheck} aCheck={aCheck} adCheck={adCheck} startDate={startDate} endDate={endDate} mode={mode} setACheck={setACheck} setDCheck={setDCheck} setADCheck={setADCheck} setStartDate={setStartDate} setEndDate={setEndDate} setMode={setMode} handleFilterMethod={handleFilterMethod} />
            <div className="overflow-x-auto">
                <Table hoverable={true} striped={true}>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell> RECORD TYPE </TableHeadCell>
                            <TableHeadCell> NAME </TableHeadCell>
                            <TableHeadCell> MOBILE </TableHeadCell>
                            <TableHeadCell> MODE </TableHeadCell>
                            <TableHeadCell> AMOUNT </TableHeadCell>
                            <TableHeadCell> TRX ID </TableHeadCell>
                            <TableHeadCell> ENTRY DATE </TableHeadCell>
                            <TableHeadCell> DESCRIPTION </TableHeadCell>
                            <TableHeadCell> RITUAL SLOT </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            data && data.map((item, index)=>{
                                return(
                                    <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <TableCell className="whitespace-nowrap text-gray-900 dark:text-white font-bold">{item.record_type}</TableCell>
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</TableCell>
                                        <TableCell>{item.mobile}</TableCell>
                                        <TableCell>{item.pay_mode ?? "-"}</TableCell>
                                        <TableCell>{item.pay_amount ? "Rs. "+item.pay_amount : "-"}</TableCell>
                                        <TableCell>{item.transaction_id ?? "-"}</TableCell>
                                        <TableCell>{new Date(item.created_at).toLocaleString('en-GB',DateTimeOptions)}</TableCell>
                                        <TableCell>{item.description ?? "-"}</TableCell>
                                        <TableCell>{item.ritual_slot ? new Date(item.ritual_slot).toLocaleString('en-GB',DateTimeOptions) : "-"}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                {loading && <Spinner />}
            </div>
        </div>
    );
}

export default DonationsRituals; 
