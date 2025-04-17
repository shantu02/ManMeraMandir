'use server'

import { createClient } from '@/utils/supabase/server'
import { AuthRetryableFetchError } from '@supabase/supabase-js';


interface Credentials{
    email: string,
    password: string,
}

export async function login(credentials:Credentials) {
    try{
        const supabase = await createClient();

        // to get user use {error, data} then data.user
        const { error } = await supabase.auth.signInWithPassword(credentials);
        
        if(error){
            console.log("error is ", error);
            return (error instanceof AuthRetryableFetchError || error.code == "ENOTFOUND") 
                    ? {error: "Server connnection error. Please check internet connection!!!"}
                    : (error.code == "invalid_credentials")
                        ? {error: "Invalid Credentials!!!"}
                        : {error: "Unexpected Error!!!"} 
        }
        
        return {success:true};
    }
    catch(e){
        return {error: "Server connnection error. Please check internet connection!!!"}
    }
}

