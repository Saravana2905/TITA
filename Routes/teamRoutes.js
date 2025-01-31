const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam, updateTeam } = require('../Controller/team_Controller');

// Route to create a team member
router.post('/createTeam', createTeam);
router.get('/getAllTeam', getAllTeam);
router.get('/getTeam/:id', getAllTeam);
router.put('/updateTeam/:id', updateTeam);

module.exports = router;