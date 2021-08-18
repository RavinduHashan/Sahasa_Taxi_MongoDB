const router = require('express').Router()
const Admin = require('../controllers/adminController')

router.post('/add', Admin.createAdmin)
router.get('/getall', Admin.getAllAdmins)
router.put('/update/:id', Admin.updateAdmin)
router.delete('/delete/:id', Admin.deleteAdmin)
router.get('/getone/:id', Admin.getOneAdmin)

module.exports = router