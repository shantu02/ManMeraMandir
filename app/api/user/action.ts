'use server'

import { ValidateUserRole } from "@/hooks/validateUserRole"

// to get role at client side from hook method
const AuthenticateUser = async () => {
    const userRole = await ValidateUserRole();
    if(userRole.status == 200){
        return {success:true};
    }
    else{
        return {denied:true};
    }
}

export default AuthenticateUser;