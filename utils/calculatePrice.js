const {PriceModel}= require('../models/pricing')

module.exports= async (distance, origin, destination) => {
    const price= await PriceModel.findOne({city: origin}).lean()

    let totalAmount
    const {
        base_kms, 
        base_amount, 
        amount_per_hour, 
        amount_per_km
    }= price

    if(distance<=base_kms){
        totalAmount= base_amount
    }
    else{
        totalAmount= base_amount+ (distance-base_kms)*amount_per_km
    }

    return totalAmount
}