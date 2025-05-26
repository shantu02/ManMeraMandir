'use server'

import { createClient } from "@/utils/supabase/server";
import { AssestsDonations, BusinessPeople, Donations, Rituals, RitualsInfo, Vendors } from "./databasesMaps";


export async function GetRituals(){
    const supabase = await createClient();
    const { data: rituals_info, error } = await supabase
                                        .from(RitualsInfo)
                                        .select('*');
    if(error){
        throw error; // need to handle it
    }
    return rituals_info;
}

export async function GetRecordTypeDropDown(){
    return [Donations, Rituals, AssestsDonations]
}

export async function GetAllRecordsForCurrentMonth(){
    const supabase = await createClient();
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(),1);
    const endDate = new Date(today.getFullYear(), today.getMonth()+1, 0, 23, 59, 59, 999);
    const {data: donationsForMonth, error:dError} = await supabase.from(Donations)
                                            .select("*")
                                            .gt('created_at', startDate.toISOString())
                                            .lt('created_at', endDate.toISOString());
    if(dError){
        throw dError; // need to handle it
    }
    const {data: abhisheksForMonth, error:aError} = await supabase.from(Rituals)
                                            .select("*")
                                            .gt('created_at', startDate.toISOString())
                                            .lt('created_at', endDate.toISOString());
    if(aError){
        throw aError; // need to handle it
    }
    const {data: assetdonationsForMonth, error:adError} = await supabase.from(AssestsDonations)
                                            .select("*")
                                            .gt('created_at', startDate.toISOString())
                                            .lt('created_at', endDate.toISOString());
    if(adError){
        throw adError; // need to handle it
    }

    return [...donationsForMonth, ...abhisheksForMonth, ...assetdonationsForMonth];
}

export async function GetAllRecordsForFilter(donation:boolean, abhishek:boolean, assetDonation:boolean, startDate:Date, endDate:Date, mode:string){
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filterRes:any[] = [];

    const GenerateQuery = (dbName:string) => {
        return supabase.from(dbName).select("*").gt('created_at', startDate.toISOString()).lt('created_at', endDate.toISOString());
    }

    if(donation){
        const dQuery = GenerateQuery(Donations);
        if(mode!='any'){
            dQuery.eq('pay_mode', mode);
        }
        const {data: donationsForFilter, error:dError} = await dQuery;
        if(dError){
            throw dError; // need to handle it
        }
        ;
        filterRes = [...donationsForFilter.map((item)=>({...item, record_type: "DONATION"}))];
    }
    
    if(abhishek){
        const rQuery = GenerateQuery(Rituals);
        if(mode!='any'){
            rQuery.eq('pay_mode', mode);
        }
        const {data: abhisheksForFilter, error:aError} = await rQuery;
        if(aError){
            throw aError; // need to handle it
        }
        filterRes = [...filterRes, ...abhisheksForFilter.map((item)=>({...item, record_type: "ABHISHEK"}))];
    }

    if(assetDonation && mode=='any'){
        const {data: assetdonationsForFilter, error:adError} = await GenerateQuery(AssestsDonations);
        if(adError){
            throw adError; // need to handle it
        }
        filterRes = [...filterRes, ...assetdonationsForFilter.map((item)=>({...item, record_type: "ASSET DONATION"}))];
    }

    return filterRes;
}

export async function GetAllDonationsForDateRange(startDate:Date, endDate:Date){
    const supabase = await createClient();
    const {data: donationsForDateRange, error} = await supabase.from(Donations).select('*')
                                                .gt('created_at', startDate.toISOString())
                                                .lt('created_at', endDate.toISOString());
    if(error){
        throw error; // need to handle it
    }
    return donationsForDateRange;
}

export async function GetAdhaarDuplicateCheck(adhaar:string){
    const supabase = await createClient();
    const {data: adhaarData, error} = await supabase.from(BusinessPeople).select("adhaar").eq("adhaar", adhaar).limit(1);
    if(error){
        throw error; // need to handle it
    }
    return adhaarData.length > 0;
}

export async function GetVendorDuplicateCheck(vendor:string){
    const supabase = await createClient();
    const {data: vendorData, error} = await supabase.from(Vendors).select("vendor").eq("adhaar", vendor).limit(1);
    if(error){
        throw error; // need to handle it
    }
    return vendorData.length > 0;
}

export async function GetAllVendors(){
    const supabase = await createClient();
    const {data: vendors, error} = await supabase.from(Vendors).select("*");
    if(error){
        throw error; // need to handle it
    }
    return vendors;
}

