
import ErrorPage from '@/components/ErrorPage';
import NavigationMenu from '@/components/Navbar';
import { ValidateUserRole } from '@/hooks/validateUserRole';
import React from 'react'

const layout = async({children}:Readonly<{children:React.ReactNode}>) => {
    const adminResponse = await ValidateUserRole();
    if(adminResponse.status != 200){
        return <ErrorPage error={{code:401, message:"You are not authorized!!"}} />
    }
    return (
        <main>
            <NavigationMenu />
            <div className="relative m-3">
                {children}
            </div>
        </main>
    )
}

export default layout;