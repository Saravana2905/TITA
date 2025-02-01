const mongoose = require('mongoose');

const careerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    exp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const careerUserdetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    yourmessage: {
        type: String,
        required: true
    },
    exp: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    cv:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Define models with more descriptive names
const CareerUserDetail = mongoose.model("CareerUserDetail", careerUserdetailsSchema);
const Career = mongoose.model("Career", careerSchema);

module.exports = { Career, CareerUserDetail };
