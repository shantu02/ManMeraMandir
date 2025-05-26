'use client'

import { useState } from "react"
import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import ButtonComponent from "../ui/ButtonComponent"
import FloatingLabelComponent from "../ui/FloatingLabel"
import { VendorSubmitRequest } from "@/app/api/supadatabase/POST"
import RecordProcessing from "../Common/RecordProcessing"
import { VendorType } from "@/types/vendor_type"


interface AddNewBusinessModalType{
    openModal: boolean,
    setOpenModal: (v:boolean)=>void,
    vendors: VendorType[] | undefined
}

const AddNewBusinessModal = ({openModal, setOpenModal, vendors}: AddNewBusinessModalType) => {

    const [newBusiness, setNewBusiness] = useState("");
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const checkVendorDuplicate = () => {
        const duplicate = vendors?.find(ele => ele.vendor.toLowerCase() === newBusiness.toLowerCase());
        return duplicate ? true : false;
    }

    const handleNewVendor = async() => {
            setPending(true);
            setError("");
            if(newBusiness!=""){
                const duplicate = checkVendorDuplicate();
                let res;
                if(duplicate){
                    res = {status: 409};
                }
                else{
                    res = await VendorSubmitRequest(newBusiness);
                }
                if(res.status == 201){
                    setError("");
                    setSuccess(true)
                }
                else if(res.status == 409){
                    setError("Duplicate Vendor is Found!!");
                    setSuccess(false)
                }
                else{
                    setError("Please Enter Valid Values!!");
                    setSuccess(false)
                }
            }
            else{
                setError("Please Enter Valid Values!!");
            }
            setPending(false);
        }

    const handleTryAgain = () => {
        setPending(false);
        setSuccess(false);
        setError("");
    }

    const handleSuccess = () =>{
        setNewBusiness("");
        setPending(false);
        setSuccess(false);
        setError("");
    }

    return (
        <Modal show={openModal} size="md" onClose={() => {setNewBusiness(""); setOpenModal(false);}}>
            <ModalHeader>Add New Business Type</ModalHeader>
            <ModalBody>
                {
                    pending || success || error
                    ? <RecordProcessing pending={pending} success={success} error={error} handleSuccess={handleSuccess} handleTryAgain={handleTryAgain} />
                    : <div className="flex flex-col justify-center items-center">
                            <div className="flex p-5">
                                <FloatingLabelComponent label={"Vendor Name"} value={newBusiness} required={true} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewBusiness(e.target.value)} className={"w-full"} />
                            </div>
                            <div className="w-fit">
                                <ButtonComponent text={"Add Business Type"} onClick={handleNewVendor} />
                            </div>
                        </div>
                }
                
            </ModalBody>
      </Modal>
    )
}

export default AddNewBusinessModal