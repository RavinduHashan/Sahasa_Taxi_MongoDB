const Driver  = require("../models/DriverModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        Driver.findOne({email:req.body.email})
        .then((driver) =>{
            if(driver){
                res.json({message: 'Email Already exists'})
            }
            else{
                let driver = new Driver({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    vehicleType: req.body.vehicleType,
                    vehicleNumber: req.body.vehicleNumber,
                    city: req.body.city,
                    password: hashedPass,
                })
                driver.save()
                    .then(driver =>{
                        res.json({
                            message: 'Driver Added Successfully'
                        })
                    })
                    .catch(error =>{
                        res.json({
                            message: 'An error occured'
                    })
                })
            }
        })
    })    
}
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    Driver.findOne({$or: [{email:username},{phoneNumber:username}]})
    .then(driver =>{
        if(driver){
            bcryptjs.compare(password, driver.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({firstName: driver.firstName}, 'driverToken', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful',
                        token 
                    })
                }
                else{
                    res.json({
                        message: 'Password does not matched'
                    })
                }
            })
        }
        else{
            res.json({
                message: 'No driver found.!'
            })
        }
    })
}

module.exports = {
    register, login
}
