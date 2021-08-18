const User = require('../models/UserModel')

const createUser = async (req, res) =>{
    const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        password: req.body.password
    })
    await newUser.save()
    .then( () =>{
        res.json("User is created successful.!")
    })
    .catch( () =>{
        res.json("Error occuer.!")
    })
}

const getAllUsers = (req, res) => {
    User.find()
    .then((user) => {
        res.json(user)
    })
    .catch(() =>{
        res.json("Error occuer.!")
    })
}

const updateUser = (async (req, res) => {
    let userId = req.params.id
    const {fullName, email, phoneNumber, city, password} = req.body
    const updateUserWithId = {
        fullName,
        email,
        phoneNumber,
        city,
        password
    }
    const updateUserDocument = await User.findByIdAndUpdate(userId, updateUserWithId)
    .then(() => {
        res.status(200).send({status:"User is updated"})
    })
    .catch(() => {
        res.status(500).send({status:"Error with updating data"})
    })
    
})

const deleteUser = (async (req, res) =>{
    let userId = req.params.id

    await User.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User is deleted"})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with deleting user", error: err.message})
    })
})

const getOneUser = (async (req, res) =>{
    let userId = req.params.id
    const user =  await User.findById(userId)
    .then((user) => {
        res.status(200).send({status: "Get the user" , user})
    }) 
    .catch(() => {
        res.status(500).send({status: "Error with geting one user", error: err.message})
    })
})
module.exports = {createUser, getAllUsers, updateUser, deleteUser, getOneUser}