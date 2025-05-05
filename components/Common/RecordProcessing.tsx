'use client'

import Image from "next/image"
import BadgeComponent from "../ui/Badge"
import ButtonComponent from "../ui/ButtonComponent"


interface RecordProcessingType{
    pending: boolean,
    success: boolean,
    error: string,
    handleSuccess: ()=>void,
    handleTryAgain: ()=>void,
}


const RecordProcessing = ({pending, success, error, handleSuccess, handleTryAgain}: RecordProcessingType) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            {
                pending
                    ?
                        <>
                            <Image src={"/paymentPending.gif"} height={50} width={50} alt="pending.." />
                            <BadgeComponent text={"Processing..."} color="warning" />
                        </>
                    : 
                    error
                        ?
                            <>
                                <Image src={"/paymentFail.gif"} height={50} width={50} alt="failed" />
                                <BadgeComponent text={error} color="danger" />
                                <ButtonComponent text="Try Again" onClick={handleTryAgain} />
                            </>
                        :
                        success
                            &&
                                <>
                                    <Image src={"/paymentSuccess.gif"} height={50} width={50} alt="done" />
                                    <BadgeComponent text={"Process Complete"} color="success" />
                                    <ButtonComponent text="Done" onClick={handleSuccess} />
                                </>
                
            }
        </div>
    )
}


export default RecordProcessing;
