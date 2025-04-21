import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
// import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";


export async function GET(request: NextRequest){
    const {searchParams} = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/home';

    if(type && token_hash){
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp( { type, token_hash } );

        if(error){
            return NextResponse.json({error: "Session is expired!!! Please login again."}, {status: 400});
        }

        redirect(next);
    }
}
