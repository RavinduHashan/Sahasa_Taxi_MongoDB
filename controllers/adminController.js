const Admin = require('../models/AdminModel')

const createAdmin = async (req, res) =>{
    const newAdmin = new Admin({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        password: req.body.password
    })
    await newAdmin.save()
    .then( () =>{
        res.json("Admin is created successful.!")
    })
    .catch( () =>{
        res.json("Error occuer.!")
    })
}

const getAllAdmins = (req, res) => {
    Admin.find()
    .then((user) => {
        res.json(user)
    })
    .catch(() =>{
        res.json("Error occuer.!")
    })
}

const updateAdmin = (async (req, res) => {
    let adminId = req.params.id
    const {fullName, email, phoneNumber, city, password} = req.body
    const updateAdminWithId = {
        fullName,
        email,
        phoneNumber,
        city,
        password
    }
    const updateAdminDocument = await Admin.findByIdAndUpdate(adminId, updateAdminWithId)
    .then(() => {
        res.status(200).send({status:"Admin is updated"})
    })
    .catch(() => {
        res.status(500).send({status:"Error with updating data"})
    })
    
})

const deleteAdmin = (async (req, res) =>{
    let adminId = req.params.id

    await Admin.findByIdAndDelete(adminId)
    .then(() => {
        res.status(200).send({status: "Admin is deleted"})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with deleting user", error: err.message})
    })
})

const getOneAdmin = (async (req, res) =>{
    let adminId = req.params.id
    const admin =  await Admin.findById(adminId)
    .then((admin) => {
        res.status(200).send({status: "Get the admin" , admin})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with geting one admin", error: err.message})
    })
})
module.exports = {createAdmin, getAllAdmins, updateAdmin, deleteAdmin, getOneAdmin}