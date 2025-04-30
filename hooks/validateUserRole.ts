'use server'

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const ValidateUserRole = async () => {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return new NextResponse(
                JSON.stringify({ error: "User not found or not authenticated!" }),
                { status: 401 }
            );
        }
        
        // Fetch user profile
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('profile')
            .eq('user_id', user.id)
            .single();

        if (error || !profile) {
            return new NextResponse(
                JSON.stringify({ error: "User profile not found or failed to fetch profile." }),
                { status: 500 }
            );
        }

        // Check if the profile is "admin"
        if (profile.profile === "admin") {
            return new NextResponse(
                JSON.stringify({ status: "success", role: "admin" }),
                { status: 200 }
            );
        }

        return new NextResponse(
            JSON.stringify({ error: "Unauthorized access. Admin role required." }),
            { status: 403 }
        );

    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ error: "An unexpected error occurred." }),
            { status: 500 }
        );
    }
};
