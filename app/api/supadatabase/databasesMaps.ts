export const Donations = "donations";
export const Rituals = "rituals";
export const RitualsInfo = "rituals_info";
export const AssestsDonations = "assestsdonations";
export const Pandits = "pandits";
export const BusinessPeople = "business_people";
export const Vendors = "vendors";

export interface DonationSubmitType{
    name: string,
    mobile: string,
    amount: string,
    payMode:string
    transactionId:string,
}

export interface AbhishekSubmitType{
    name: string,
    mobile: string,
    slot: string,
    payMode:string
    transactionId:string,
}

export interface AssestDonationSubmitType{
    name: string,
    mobile: string,
    description: string,
}

export interface PanditSubmitType{
    name: string,
    mobile: string,
    adhaar: string,
}

export interface BusinessPersonSubmitType{
    name: string,
    mobile: string,
    adhaar: string,
    businessName: string,
    businessAddress: string,
    personType: string
}


export function DonationsInsert(donationItem:DonationSubmitType){
    const {name, mobile, amount, payMode, transactionId} = donationItem;
    return [
        {
            name: name,
            mobile: mobile,
            pay_amount : amount,
            pay_mode: payMode,
            transaction_id: transactionId
        }
    ];
}

export function AbhisheksInsert(abhishekItem:AbhishekSubmitType){
    const {name, mobile, slot, payMode, transactionId} = abhishekItem;
    return [
        {
            "name": name,
            "mobile": mobile,
            "ritual_type": 1,
            "ritual_slot" : slot,
            "pay_mode": payMode.toLowerCase(),
            "transaction_id": transactionId
        }
    ];
}

export function AssestsDonationInsert(assestItem:AssestDonationSubmitType){
    const {name, mobile, description} = assestItem;
    return [
        {
            "name":name,
            "mobile":mobile,
            "description":description.replaceAll('\n', ', ')
        }
    ];
}

export function PanditInsert(panditItem:PanditSubmitType){
    const {name, mobile, adhaar} = panditItem;
    return [
        {
            "name":name,
            "mobile":mobile,
            "adhaar":adhaar,
        }
    ]
}

export function BusinessPersonInsert(businessPersonItem:BusinessPersonSubmitType){
    const {name, mobile, adhaar, businessName, businessAddress, personType} = businessPersonItem;
    return [
        {
            "name":name,
            "mobile":mobile,
            "adhaar":adhaar,
            "business_name":personType=="vendor" ? businessName : "",
            "business_address":personType=="vendor" ? businessAddress : "",
            "person_type":personType,
        }
    ]
}

export function VendorInsert(vendorItem:string){
    return [ {"vendor": vendorItem} ]
}
