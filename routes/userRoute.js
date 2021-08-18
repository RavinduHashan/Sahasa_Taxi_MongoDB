const router = require('express').Router()
const User = require('../controllers/userController')

router.post('/add', User.createUser)
router.get('/getall', User.getAllUsers)
router.put('/update/:id', User.updateUser)
router.delete('/delete/:id', User.deleteUser)
router.get('/getone/:id', User.getOneUser)

module.exports = router