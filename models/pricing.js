const mongoose= require('mongoose')
const {Schema}= mongoose

const priceSchema= new Schema({
    country: {
        type: String
    },
    city: {
        type: String
    },
    city_is_flagged: {
        type: Boolean,
        default: false
    },
    vehicle_type: {
        type: String
    },
    amount_airport_fees: {
        type:Number
    },
    amount_per_hour: {
        type:Number
    },
    amount_per_km: {
        type:Number
    },
    base_amount: {
        type:Number
    },
    base_kms: {
        type:Number
    },
})

module.exports.PriceModel= mongoose.model('PriceMOdel', priceSchema)
