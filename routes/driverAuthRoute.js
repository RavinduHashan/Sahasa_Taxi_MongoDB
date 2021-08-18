const express = require("express")
const router  = express.Router()
const driverAuthController = require('../controllers/driverAuthController')

router.post('/register', driverAuthController.register)
router.post('/login', driverAuthController.login)

module.exports = router