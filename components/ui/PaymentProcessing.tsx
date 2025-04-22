import Image from "next/image";
import BadgeComponent from "./Badge";
import ButtonComponent from "./ButtonComponent";


interface PaymentProcessingProps {
    name: string,
    mobile: string,
    amount?:string,
    slot?:string,
    description?: string,
    pending:boolean,
    error:boolean,
    setName: (value:string)=>void,
    setMobile: (value:string)=>void,
    setDescription?: (value:string)=>void,
    setAmount?: (value:string)=>void,
    setSlot?: (value:string)=>void,
    setShowProcess: (value:boolean)=>void,
    setPending: (value:boolean)=>void,
    setError: (value:boolean)=>void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentProcessing = ({name, mobile, amount, slot, description, pending, error, setName, setMobile, setAmount, setDescription, setSlot, setShowProcess, setPending, setError}:PaymentProcessingProps) => {

    const handleSuccess = () => {
        setName("");
        setMobile("");
        setDescription?.("");
        setAmount?.("");
        setSlot?.("");
        setPending(false);
        setError(false);
        setShowProcess(false);
    }

    const handleTryAgain = () => {
        setPending(false);
        setError(false);
        setShowProcess(false);
    }

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
                                <BadgeComponent text={"Process Failed"} color="danger" />
                                <ButtonComponent text="Try Again" onClick={handleTryAgain} />
                            </>
                        :
                            <>
                                <Image src={"/paymentSuccess.gif"} height={50} width={50} alt="done" />
                                <BadgeComponent text={"Process Complete"} color="success" />
                                <ButtonComponent text="Done" onClick={handleSuccess} />
                            </>
                
            }
        </div>
    )
}

export default PaymentProcessing;