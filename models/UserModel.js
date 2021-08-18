const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
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
    city : {
        type:String,
        required: [true, 'City is required.!']
    },
    password : {
        type:String,
        required: [true, 'Password is required.!']
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User