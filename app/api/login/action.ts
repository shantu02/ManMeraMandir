'use server'

import { createClient } from '@/utils/supabase/server'


interface Credentials{
    email: string,
    password: string,
}

export async function login(credentials:Credentials) {

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) { return {error: "Invalid Credentials!!!"};}
    
    return {success:true};
}

