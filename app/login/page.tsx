'use client'

// import { login } from "../api/login/action";
import { login } from "@/app/api/login/action";
import { useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { redirect } from "next/navigation";
import ButtonComponent from "@/components/ui/ButtonComponent";
import FloatingLabelComponent from "@/components/ui/FloatingLabel";
import FormConatinerComponent from "@/components/ui/FormContainer";
// import FormConatinerComponent from "../../components/ui/FormContainer";

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
        <FormConatinerComponent>
            <FloatingLabelComponent className="z-0" label={"Email"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
            />
            <FloatingLabelComponent type="password" className="z-0" label={"Password"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            />
            {error && 
                <div className="relative text-red-500 text-center py-3">
                    {error}
                </div>
            }
            <div className="flex justify-center">
                <ButtonComponent className="text-lg" text={"Log in"} onClick={handleSubmit} />
            </div>
            {loading && <Spinner />}
        </FormConatinerComponent>
    )
}

export default LoginPage;