/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Button } from "@/components/ui/button";
import { login } from "../api/login/action";
import { useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { redirect } from "next/navigation";

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        const response = await login({email, password});
        if(response.error){
            setError(response.error);
        }
        setLoading(false);
        redirect("/home");
    }

    return(
        <div className="h-screen flex items-center justify-center">
            <div id="loginDiv" className="rounded-t-xl overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 p-10">
                <div className="flex-row w-full max-w-sm mx-auto space-x-4">
                    <div className="my-3">
                        <label htmlFor="email" className="text-purple-800">Enter email:</label>
                        <input id="email" value={email} className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="email" placeholder="Enter Username" 
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="password" className="text-purple-800">Enter Password:</label>
                        <input id="password" value={password} className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="password" placeholder="Enter Password" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </div>
                    {error && 
                        <div className="text-red-500 text-center py-3">
                            {error}
                        </div>
                    }
                    
                    <div className="flex items-center justify-center">
                        <Button className="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                            onClick={handleSubmit}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>

            { loading && <Spinner size="medium" show={true}>Loading...</Spinner> }
            
        </div>
    )
}

export default LoginPage;