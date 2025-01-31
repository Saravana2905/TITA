const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam, updateTeam, deleteTeam, getTeamById } = require('../Controller/team_Controller');

// Route to create a team member
router.post('/createTeam', createTeam);
router.get('/getAllTeam', getAllTeam);
router.get('/getTeam/:id', getTeamById);
router.put('/updateTeam/:id', updateTeam);
router.delete('/deleteTeam/:id', deleteTeam);

module.exports = router;