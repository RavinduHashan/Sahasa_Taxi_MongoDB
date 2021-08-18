const router = require('express').Router()
const Trip = require('../controllers/tripController')

router.post('/add', Trip.createTrip)
router.get('/getall', Trip.getAllTrips)
router.put('/update/:id', Trip.updateTrip)
router.delete('/delete/:id', Trip.deleteTrip)
router.get('/getone/:id', Trip.getOneTrip)

module.exports = router