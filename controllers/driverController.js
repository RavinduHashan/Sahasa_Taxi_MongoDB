const Driver = require('../models/DriverModel')

const createDriver = async (req, res) =>{
    const newDriver = new Driver({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        vehicleType: req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber,
        city: req.body.city,
        password: req.body.password
    })
    await newDriver.save()
    .then( () =>{
        res.json("Driver is created successful.!")
    })
    .catch( () =>{
        res.json("Error occuer.!")
    })
}

const getAllDrivers = async (req, res) => {
   await Driver.find()
    .then((driver) => {
        res.json(driver)
    })
    .catch(() =>{
        res.json("Error occuer.!")
    })
}

const updateDriver = (async (req, res) => {
    let driverId = req.params.id
    const {fullName, email, phoneNumber, vehicleType, vehicleNumber, city, password} = req.body
    const updateDriverWithId = {
        fullName,
        email,
        phoneNumber,
        vehicleType,
        vehicleNumber,
        city,
        password
    }
    const updateDriverdocument = await Driver.findByIdAndUpdate(driverId, updateDriverWithId)
    .then(() => {
        res.status(200).send({status:"Driver is updated"})
    })
    .catch(() => {
        res.status(500).send({status:"Error with updating data"})
    })
    
})

const deleteDriver = (async (req, res) =>{
    let driverId = req.params.id

    await Driver.findByIdAndDelete(driverId)
    .then(() => {
        res.status(200).send({status: "Driver is deleted"})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with deleting user", error: err.message})
    })
})

const getOneDriver = (async (req, res) =>{
    let driverId = req.params.id
    const user =  await Driver.findById(driverId)
    .then((driver) => {
        res.status(200).send({status: "Get the driver" , driver})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with geting one driver", error: err.message})
    })
})
module.exports = {createDriver, getAllDrivers, updateDriver, deleteDriver, getOneDriver}