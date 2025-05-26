'use server'

import { createClient } from "@/utils/supabase/server"
import { AbhisheksInsert, AbhishekSubmitType, AssestDonationSubmitType, AssestsDonationInsert, AssestsDonations, BusinessPeople, BusinessPersonInsert, BusinessPersonSubmitType, Donations, DonationsInsert, DonationSubmitType, PanditInsert, Pandits, PanditSubmitType, Rituals, VendorInsert, Vendors } from "./databasesMaps";
import { GetAdhaarDuplicateCheck } from "./GET";



export async function DonationSubmitRequest(donationItem:DonationSubmitType){
    const supabase = await createClient();
    console.log("payMode : ",donationItem.payMode);
    const result = await supabase.from(Donations).insert(DonationsInsert(donationItem));
    console.log("Donation Submit Request result : ", result);
    return result;
};

export async function AbhishekSubmitRequest(abhishekItem:AbhishekSubmitType){
    const supabase = await createClient();
    const result = await supabase.from(Rituals).insert(AbhisheksInsert(abhishekItem));
    console.log("Abhishek Submit result : ", result);
    return result;
};

export async function AsssetDonationSubmitRequest(assestItem:AssestDonationSubmitType){
    const supabase = await createClient();
    const result = await supabase.from(AssestsDonations).insert(AssestsDonationInsert(assestItem));
    console.log("Assest Donation Submit Request result : ", result);
    return result;
};

export async function PanditSubmitRequest(panditItem:PanditSubmitType){
    const supabase = await createClient();
    const result = await supabase.from(Pandits).insert(PanditInsert(panditItem));
    console.log("Pandit Submit Request result : ", result);
    return result;
}

export async function BusinessPeopleSubmitRequest(bpItem:BusinessPersonSubmitType){
    const supabase = await createClient();
    if(bpItem.adhaar!=""){
        const adhaarCheck = await GetAdhaarDuplicateCheck(bpItem.adhaar);
        if(adhaarCheck){return {status: 409};}
    }
    const result = await supabase.from(BusinessPeople).insert(BusinessPersonInsert(bpItem));
    console.log("Business Person Submit Request result : ", result);
    return result;
}

export async function VendorSubmitRequest(vendor:string){
    const supabase = await createClient();
    // vendors already loaded on page.tsx
    // const vendorCheck = await GetVendorDuplicateCheck(vendor);
    // if(vendorCheck){
    //     return {status: 409};
    // }
    const result = await supabase.from(Vendors).insert(VendorInsert(vendor));
    console.log("Vendor Submit Request result : ", result);
    return result;
}
