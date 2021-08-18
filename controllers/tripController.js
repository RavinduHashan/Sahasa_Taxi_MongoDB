const Trip = require('../models/TripModel')

const createTrip = async (req, res) =>{
    const newTrip = new Trip({
        pickLocation: req.body.pickLocation,
        dropLocation: req.body.dropLocation,
        pickTime: req.body.pickTime,
        dropTime: req.body.dropTime,
        driver: req.body.driver,
        response: req.body.response
    })
    await newTrip.save()
    .then( () =>{
        res.json("Trip is created successful.!")
    })
    .catch( (err) =>{
        console.log(err)
        res.json("Error occuer.!")
    })
}

const getAllTrips = (req, res) => {
    Trip.find()
    .then((trip) => {
        res.json(trip)
    })
    .catch(() =>{
        res.json("Error occuer.!")
    })
}

const updateTrip = (async (req, res) => {
    let tripId = req.params.id
    const {pickLocation, dropLocation, pickTime, dropTime, response} = req.body
    const updateTripWithId = {
        pickLocation,
        dropLocation,
        pickTime,
        dropTime,
        response
    }
    const updateTripDocument = await Trip.findByIdAndUpdate(tripId, updateTripWithId)
    .then(() => {
        res.status(200).send({status:"Trip is updated"})
    })
    .catch(() => {
        res.status(500).send({status:"Error with updating data"})
    })
    
})

const deleteTrip = (async (req, res) =>{
    let tripId = req.params.id

    await Trip.findByIdAndDelete(tripId)
    .then(() => {
        res.status(200).send({status: "Trip is deleted"})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with deleting trip", error: err.message})
    })
})

const getOneTrip = (async (req, res) =>{
    let tripId = req.params.id
    const trip =  await Trip.findById(tripId)
    .then((trip) => {
        res.status(200).send({status: "Get the trip" , trip})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with geting one trip", error: err.message})
    })
})
module.exports = {createTrip, getAllTrips, updateTrip, deleteTrip, getOneTrip}