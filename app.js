const express= require('express')
const mongoose= require('mongoose')
const app= express()

require('dotenv').config()
app.use(express.json())

const registration= require('./routes/registration')

app.use('/api', registration)

const dburl= "mongodb://localhost:27017/logis"
mongoose.connect(dburl)

app.listen(5000, ()=> {
    console.log('server running on port 5000 ... ')
})
