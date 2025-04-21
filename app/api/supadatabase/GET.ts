'use server'

import { createClient } from "../../../utils/supabase/server";
import { RitualsInfo } from "./databasesMaps";


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

