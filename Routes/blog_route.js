const express = require('express')
const router = express.Router()
const {createBlog , getBlogs, deleteBlogs, updateBlog, getBlogsById} = require('../Controller/blog_Controller')
// const authenticatetoken = require('../Middleware/validateToken')
const upload = require('../Middleware/multer')

//create blog
 router.post('/create',upload.array('image',10), createBlog);
//  ,authenticatetoken

//get blog
 router.get('/get', getBlogs);

 //get blog
 router.get('/get/:id', getBlogsById);

//delete blog
router.delete('/delete-blog/:id', deleteBlogs);

//update Blog
router.put('/update-blog/:id',upload.array('image',10), updateBlog)

module.exports = router;