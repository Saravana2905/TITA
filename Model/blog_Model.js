const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: [{
        type: String
    }]
});

// Create Blog Model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
