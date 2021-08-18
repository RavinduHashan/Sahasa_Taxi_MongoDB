const router = require('express').Router()
const Driver = require('../controllers/driverController')

router.post('/add', Driver.createDriver)
router.get('/getall', Driver.getAllDrivers)
router.put('/update/:id', Driver.updateDriver)
router.delete('/delete/:id', Driver.deleteDriver)
router.get('/getone/:id', Driver.getOneDriver)

module.exports = router