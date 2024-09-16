const express = require('express')
const router = express.Router()
const authenticatetoken = require('../Middleware/validateToken')
const {createCareer, getCareer, createCareerUserDetails, deleteCareer, updateCareer, getCareerUserDetails} = require('../Controller/career_Controller')

//create career (for admin)
 router.post('/create', createCareer);
//  ,authenticatetoken
//get career (user page)
 router.get('/get', getCareer);

//get career user details (for user)
router.post('/createUserdetails', createCareerUserDetails)

//get career user details
router.get('/career-user-details', getCareerUserDetails)

//delte career 
router.delete('/delete-career/:id',deleteCareer);

//update career
router.put('/update-career/:id', updateCareer)

//export router to controller
module.exports = router;