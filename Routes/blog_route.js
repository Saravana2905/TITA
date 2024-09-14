const express = require('express')
const router = express.Router()
const {createBlog , getBlogs} = require('../Controller/blog_Controller')
const authenticatetoken = require('../Middleware/validateToken')
const upload = require('../Middleware/multer')

//create blog
 router.post('/create',authenticatetoken,upload.array('image',10), createBlog);
//  ,authenticatetoken
//get blog
 router.get('/get', getBlogs);


module.exports = router;