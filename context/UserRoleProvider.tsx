'use client'

import AuthenticateUser from '@/app/api/user/action';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
interface UserContextType {
    admin: boolean;
    fetchUser: () => Promise<void>;
}

// Create the context with the defined type
const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [admin, setAdmin] = useState<boolean>(false);

    const fetchUser = async () => {
        const ifAdmin = await AuthenticateUser();
        if (ifAdmin.success) {
            setAdmin(true);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ admin, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    // Ensure context is not undefined
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
