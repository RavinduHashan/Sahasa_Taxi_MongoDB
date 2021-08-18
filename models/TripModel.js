const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tripSchema = new Schema({
    pickLocation : {
        type:String,
        required: [true, 'Pick location is required.!']
    },
    dropLocation : {
        type:String,
        required: [true, 'Drop location is required.!']
    },
    pickTime : {
        type:String,
        required: [true, 'Pick time is required.!']
    },
    dropTime : {
        type:String,
        required: [true, 'Drop time is required.!']
    },
    driver : {
        type:String,
        required: [true, 'driver is required.!']
    },
    response : {
        type:String,
        required: [false]
    }
})

const Trip = mongoose.model("Trip", tripSchema)

module.exports = Trip