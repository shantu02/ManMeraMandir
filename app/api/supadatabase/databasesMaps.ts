export const Donations = "donations";
export const Rituals = "rituals";
export const RitualsInfo = "rituals_info";

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
    ritualId: string,
    amount: string,
    slot: string,
    payMode:string
    transactionId:string,
}

export function DonationsInsert(donationItem:DonationSubmitType){
    const {name, mobile, amount, payMode, transactionId} = donationItem;
    return [
        {
            name: name,
            mobile: mobile,
            pay_amount : amount,
            pay_mode: payMode.toLowerCase(),
            transaction_id: transactionId
        }
    ];
}

export function AbhisheksInsert(abhishekItem:AbhishekSubmitType){
    const {name, mobile, ritualId, amount, slot, payMode, transactionId} = abhishekItem;
    let custom = false;
    if(ritualId=="-" || ritualId=="" || ritualId==null){
        custom=true;
    }
    return [
        {
            "name": name,
            "mobile": mobile,
            "ritual_type": parseInt(ritualId, 10),
            "is_custom": custom,
            "custom_amount" : amount,
            "ritual_slot" : slot,
            "pay_mode": payMode.toLowerCase(),
            "transaction_id": transactionId
        }
    ];
}
