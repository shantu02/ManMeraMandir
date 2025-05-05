
'use client'

const nameRegx = /^[a-zA-Z\s]+$/;
const mobileRegx = /^[1-9]\d{9}$/;


interface ValidateFormValuesType{
    name: string,
    mobile?: string | null,
    amount?: string | null,
    slot?: string | null, 
    description?: string | null, 
}

export const ValidateFormValues = ({name, amount=null, mobile=null, slot=null, description=null}:ValidateFormValuesType) => {
    if(amount!=null && amount===""){amount="-1";}
    return (name.length<=1 || !nameRegx.test(name) || (mobile && !mobileRegx.test(mobile || '1')) || slot?.length==0 || description?.length==0 || (amount && parseInt(amount)<=0)) ? false : true;
}


interface ValidatePersonAddFormValuesType{
    name: string,
    mobile: string,
    adhaar: string,
    businessName: string, 
    businessAddress?: string,
    personType: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ValidatePersonAddFormValues = ({name, mobile, adhaar, businessName, businessAddress, personType}:ValidatePersonAddFormValuesType) => {
    const commonCheck = (name.length>1 && nameRegx.test(name) && [0,12].includes(adhaar.length) && mobile.length>1 && mobileRegx.test(mobile));
    if(personType=="vendor"){
        return commonCheck && businessName.length!=0;
    }
    return commonCheck;
}   
