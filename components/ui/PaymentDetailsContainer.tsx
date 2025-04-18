import React, { ReactNode } from "react";

interface PaymentDetailsType{
    children: ReactNode,
    heading: string,
    halfScreen:boolean,
}

const PaymentDetailsContainer:React.FC<PaymentDetailsType> = ({children, heading, halfScreen}) => {
    return(
        <div className="md:min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 mx-2">
            <div className={`relative py-3 ${halfScreen ? "sm:max-w-xl md:mx-3" : "md:mx-10"} `}>
                <div className="relative bg-white shadow-lg rounded md:rounded-3xl p-5 md:p-10">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-center">{heading}</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                
                                <div className="relative flex flex-col gap-5">
                                    
                                    {children}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsContainer;