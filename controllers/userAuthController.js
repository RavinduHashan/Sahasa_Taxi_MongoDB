const User  = require("../models/UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { findOne } = require("../models/UserModel")

const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }

        User.findOne({email:req.body.email})
        .then((user) =>{
            if(user){
                res.json({message: 'Email Already exists'})
            }
            else{
                let user = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    city: req.body.city,
                    password: hashedPass,
                })
                user.save()
                    .then(user =>{
                        res.json({
                            message: 'User Added Successfully'
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

    User.findOne({$or: [{email:username},{phoneNumber:username}]})
    .then(user =>{
        if(user){
            bcryptjs.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({firstName: user.firstName}, 'userToken', {expiresIn: '1h'})
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
                message: 'No user found.!'
            })
        }
    })
}

module.exports = {
    register, login
}
