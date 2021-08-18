const mongoose = require('mongoose')

const Schema = mongoose.Schema

const driverSchema = new Schema({
    fullName : {
        type:String,
        required: [true, 'Full name is required.!']
    },
    email : {
        type:String,
        required: [true, 'Email is required.!']
    },
    phoneNumber : {
        type:String,
        required: [true, 'Phone number is required.!']
    },
    vehicleType : {
        type:String,
        required: [true, ' Vehicle type is required.!']
    },
    vehicleNumber : {
        type:String,
        required: [true, 'Vehicle number is required.!']
    },
    city : {
        type:String,
        required: [true, 'City is required.!']
    },
    password : {
        type:String,
        required: [true, 'Password is required.!']
    },
})

const Driver = mongoose.model("Driver", driverSchema)

module.exports = Driver