const express= require('express')
const router= express.Router()
const request = require('request')

const {PriceModel}= require('../models/pricing')
const {calculateAmount}= require('../utils/calculatePrice')

router.post('/registration', async(req, res)=> {
    try{
        const {origin, destination}= req.body
        let u2= `https://www.distance24.org/route.json?stops=${origin}|${destination}`
        console.log('u2: ', u2)
        
        let distance
        request(u2, (error, response)=>{
     
            // Printing the error if occurred
            if(error) console.log('error: ' ,error)
            
            // Printing distance
            distance= JSON.parse(response.body).distance
            console.log('response: ', distance);                             
        });

        if(distance>=1000){
            return res.send({
                success: true,
                message: "Too far to offer ride"
            })
        }

        if(distance<30){
            return res.send(false)
        }

        const {city_is_flagged: originCityFlag}= await PriceModel.findOne({city: origin}).lean()
        const {city_is_flagged: destinationCityFlag}= await PriceModel.findOne({city: destination}).lean()

        if(! (originCityFlag && destinationCityFlag)){
            return res.send(true)
        }

        let amount= await calculateAmount(distance, origin, destination)
        if(amount<50){
            return res.send(true)
        }

        return res.send(false)

    }
    catch(err){
        console.log('error: ', err.message)
        return res.status(400).send({
            success: false,
            msg: 'Some error occurred'
        })
    }
})

module.exports= router