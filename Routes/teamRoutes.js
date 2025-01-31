const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam } = require('../Controller/team_Controller');

// Route to create a team member
router.post('/createTeam', createTeam);
router.get('/getAllTeam', getAllTeam);

module.exports = router;