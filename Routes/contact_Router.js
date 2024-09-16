const express = require('express')
const router = express.Router()
const {createContact, getContact, deleteContact} = require('../Controller/contact_Controller')

//create contact
 router.post('/create', createContact);

// //get contact
 router.get('/get', getContact);

// delete contact
router.get('/delete/:id',deleteContact);


//export router to controller
module.exports = router;