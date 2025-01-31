const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    sno: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Position: {
        type: String,
        required: true
    },
    Experience: {
        type: String,
        required: true
    },
    ExperienceNo:{
        type: String,
        required: true
    },
    Key_responsibilities: {
        type : String,
        required: true
    },
    Specialization: { 
        type : String,
        required: true
    },
    Vision: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        Required: true
    },
    instagram:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        required: true
    }

});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
