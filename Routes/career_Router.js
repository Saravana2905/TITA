const express = require('express')
const router = express.Router()
const authenticatetoken = require('../Middleware/validateToken')
const {createCareer, getCareer, createCareerUserDetails, deleteCareer, updateCareer, getCareerUserDetails, deleteCareerUserDetails} = require('../Controller/career_Controller')

//create career (for admin)
 router.post('/create',authenticatetoken, createCareer);
//  ,authenticatetoken
//get career (user page)
 router.get('/get', getCareer);

//get career user details (for user)
router.post('/createUserdetails', createCareerUserDetails)

//get career user details
router.get('/career-user-details',authenticatetoken, getCareerUserDetails)

//delete career user details
router.delete('/career-user-details/delete/:id',authenticatetoken, deleteCareerUserDetails)

//delte career 
router.delete('/delete-career/:id',authenticatetoken,deleteCareer);

//update career
router.put('/update-career/:id',authenticatetoken, updateCareer)

//export router to controller
module.exports = router;