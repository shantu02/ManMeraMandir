'use client'

import { Checkbox, Dropdown, DropdownItem } from "flowbite-react";
// import { useState } from "react";
import ButtonComponent from "../ui/ButtonComponent";
import { useEffect, useState } from "react";
import DateRange from "../Common/DateRange";
import { ExportUnionTypes } from "@/types/export_type_unions";
import DataExport from "../Common/DataExport";

interface DataFilters{
    startDate: Date,
    endDate: Date,
    mode: string,
    aCheck: boolean,
    dCheck: boolean,
    adCheck: boolean,
    data: ExportUnionTypes[] | undefined,
    pageName: string,
    setStartDate: (v:Date)=>void,
    setEndDate: (v:Date)=>void,
    setMode: (v:string)=>void,
    setDCheck: (v:boolean)=>void,
    setACheck: (v:boolean)=>void,
    setADCheck: (v:boolean)=>void,
    handleFilterMethod: ()=>void,
}


const DataFilters = ({aCheck, dCheck, adCheck, startDate, endDate, mode, data, pageName, setACheck, setDCheck, setADCheck, setStartDate, setEndDate, setMode, handleFilterMethod}:DataFilters) => {

    const [showModeToggle, setShowModeToggle] = useState(aCheck || dCheck);
    useEffect(()=>{
        setShowModeToggle(aCheck || dCheck);
    },[aCheck, dCheck])

    const getDataSourceArray = () => {
        const arr: string[] = [];
        if(dCheck){
            arr.push("Donations");
        }
        if(aCheck){
            arr.push("Abhisheks");
        }
        if(adCheck){
            arr.push("Assest Donations");
        }
        return arr;
    }
    
    return (
        <div className="m-10">
            <DateRange startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <div className="flex flex-col md:flex-row items-center justify-between m-5">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Dropdown label="Select Data Sources" dismissOnClick={false} className="text-sm text-nowrap">
                        <DropdownItem onClick={() => {if(aCheck || adCheck){setDCheck(!dCheck)}}}>
                            <Checkbox checked={dCheck} readOnly className="p-2" /> 
                            <span className="p-2">Donations</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => {if(dCheck || adCheck){setACheck(!aCheck)}}}>
                            <Checkbox checked={aCheck} readOnly className="p-2" /> 
                            <span className="p-2">Abhisheks</span>
                        </DropdownItem>
                        {mode=='any' && <DropdownItem onClick={() => {if(aCheck || dCheck){setADCheck(!adCheck)}}}>
                            <Checkbox checked={adCheck} readOnly className="p-2" /> 
                            <span className="p-2">Assest Donations</span>
                        </DropdownItem>}
                    </Dropdown>

                    <div className={`flex gap-2 items-center m-2 ${(showModeToggle) ? "visible" : "invisible"}`}> 
                        <Dropdown label={mode.toUpperCase()} dismissOnClick={false} className="text-sm text-nowrap" color={"alternative"}>
                            <DropdownItem onClick={() => setMode('cash')}>
                                <Checkbox checked={mode=='cash'} readOnly className="p-2" /> 
                                <span className="p-2">CASH</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => setMode('upi')}>
                                <Checkbox checked={mode=='upi'} readOnly className="p-2" /> 
                                <span className="p-2">UPI</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => setMode('any')}>
                                <Checkbox checked={mode=='any'} readOnly className="p-2" /> 
                                <span className="p-2">ANY</span>
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex gap-4">
                    <DataExport data={data} dataSourceArray={getDataSourceArray()} startDate={startDate} endDate={endDate} pageName={pageName} />
                    <ButtonComponent text={"Filter"} onClick={handleFilterMethod} />
                </div>
            </div>
        </div>
    )
}

export default DataFilters;