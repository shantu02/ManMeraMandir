'use server'

import { createClient } from "@/utils/supabase/server"
import { AbhisheksInsert, AbhishekSubmitType, Donations, DonationsInsert, DonationSubmitType, Rituals } from "./databasesMaps";


export async function DonationSubmitRequest(donationItem:DonationSubmitType){
    const supabase = await createClient();
    console.log(donationItem)
    const result = await supabase.from(Donations).insert(DonationsInsert(donationItem));
    return result;
};

export async function AbhishekSubmitRequest(abhishekItem:AbhishekSubmitType){
    const supabase = await createClient();
    const result = await supabase.from(Rituals).insert(AbhisheksInsert(abhishekItem));
    return result;
}
