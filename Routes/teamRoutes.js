const express = require('express');
const router = express.Router();
const { createTeam } = require('../Controller/team_Controller');

// Route to create a team member
router.post('/createTeam', createTeam);

module.exports = router;