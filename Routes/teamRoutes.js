const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam, updateTeam, deleteTeam } = require('../Controller/team_Controller');

// Route to create a team member
router.post('/createTeam', createTeam);
router.get('/getAllTeam', getAllTeam);
router.get('/getTeam/:id', getAllTeam);
router.put('/updateTeam/:id', updateTeam);
router.delete('/deleteTeam/:id', deleteTeam);

module.exports = router;