const express = require('express')
const router = express.Router()
const {createContact, getContact} = require('../Controller/contact_Controller')

//create product
 router.post('/create', createContact);

// //get students
 router.get('/get', getContact);







//export router to controller
module.exports = router;