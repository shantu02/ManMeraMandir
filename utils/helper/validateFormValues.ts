
'use client'

interface ValidateFormValuesType{
    name: string,
    mobile?: string | null,
    amount?: string | null,
    slot?: string | null, 
    description?: string | null, 
}

const nameRegx = /^[a-zA-Z\s]+$/;
const mobileRegx = /^[1-9]\d{9}$/;

const ValidateFormValues = ({name, amount=null, mobile=null, slot=null, description=null}:ValidateFormValuesType) => {
    if(amount!=null && amount===""){amount="-1";}
    return (name.length<=1 || !nameRegx.test(name) || (mobile && !mobileRegx.test(mobile || '1')) || slot?.length==0 || description?.length==0 || (amount && parseInt(amount)<=0)) ? false : true;
}

export default ValidateFormValues;
