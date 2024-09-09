const Blog = require("../Model/blog_Model");
const cloudinary = require("../cloudinary");
const fs = require("fs");

exports.createBlog = async (req, res) => {
  try {
    const { title, desc } = req.body;
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedUrls = [];

    for (const file of req.files) {
      const filePath = file.path;

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found: ${filePath}` });
      }

      const result = await cloudinary.uploader.upload(filePath);

      uploadedUrls.push(result.secure_url);

      // Delete the file from the local server
      fs.unlinkSync(filePath);
    }

    const blog = await Blog.create({
      title,
      desc,
      image: uploadedUrls,
    });

    res.status(200).json({
      message: "Images uploaded to Cloudinary and blog created successfully",
      blog,
      urls: uploadedUrls, // Array
    });
  } catch (error) {
    // Error handling
    console.error("Error during image upload:", error.message);
    res.status(500).json({
      error: "Image upload to Cloudinary failed",
      details: error.message,
    });
  }
};

//get blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
    });
  }
};
