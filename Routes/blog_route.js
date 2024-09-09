const express = require('express')
const router = express.Router()
const {createBlog , getBlogs} = require('../Controller/blog_Controller')
const upload = require('../Middleware/multer')

//create blog
 router.post('/create',upload.array('image',10), createBlog);

//get blog
 router.get('/get', getBlogs);


module.exports = router;