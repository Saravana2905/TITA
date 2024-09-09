const express = require('express')
const router = express.Router()
const {createCareer, getCareer, createCareerUserDetails} = require('../Controller/career_Controller')

//create career (for admin)
 router.post('/create', createCareer);

//get career (user page)
 router.get('/get', getCareer);

//get career user details (for user)
router.post('/createUserdetails', createCareerUserDetails)





//export router to controller
module.exports = router;