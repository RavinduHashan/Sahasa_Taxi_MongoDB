const Admin  = require("../models/AdminModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        Admin.findOne({email:req.body.email})
        .then((admin) =>{
            if(admin){
                res.json({message: 'Email Already exists'})
            }
            else{
                let admin = new Admin({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    city: req.body.city,
                    password: hashedPass,
                })
                admin.save()
                    .then(user =>{
                        res.json({
                            message: 'Admin Added Successfully'
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

    Admin.findOne({$or: [{email:username},{phoneNumber:username}]})
    .then(admin =>{
        if(admin){
            bcryptjs.compare(password, admin.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({firstName: admin.firstName}, 'adminToken', {expiresIn: '1h'})
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
                message: 'No admin found.!'
            })
        }
    })
}

module.exports = {
    register, login
}
