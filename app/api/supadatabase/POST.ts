'use server'

import { createClient } from "@/utils/supabase/server"
import { AbhisheksInsert, AbhishekSubmitType, AssestDonationSubmitType, AssestsDonationInsert, AssestsDonations, Donations, DonationsInsert, DonationSubmitType, Rituals } from "./databasesMaps";



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
