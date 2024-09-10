const express = require('express')
const router = express.Router()
const {authenticatetoken} = require('./Middleware/validateToken.js')
const {createCareer, getCareer, createCareerUserDetails} = require('../Controller/career_Controller')

//create career (for admin)
 router.post('/create',authenticatetoken, createCareer);

//get career (user page)
 router.get('/get', getCareer);

//get career user details (for user)
router.post('/createUserdetails', createCareerUserDetails)





//export router to controller
module.exports = router;