const express = require('express')
const router = express.Router()
const {createAdmin, loginAdmin} = require('../Controller/admin_Controller')

//create product
 router.post('/create', createAdmin);

//get students
 router.post('/login', loginAdmin);


//export router to controller
module.exports = router;