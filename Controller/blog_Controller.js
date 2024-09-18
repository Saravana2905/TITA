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
    const totalBlogs = blogs.length;

    res.status(200).json({
      success: true,
      totalBlogs,
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


//get blogs
exports.getBlogsById = async (req, res) => {
  try {
    const {id} = req.params;
    const blogs = await Blog.findById(id);
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


//delete
exports.deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.findByIdAndDelete(id);
    if (!blogs) {
      return res.status(404).json({message: `cannot find by id ${id}`})
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blogs",
    })
  }
};


//update blogs
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Get the updated data from the request body

    // Fetch the existing blog
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: `Cannot find blog with id ${id}` });
    }

    // Check if new files are uploaded
    if (req.files && req.files.length > 0) {
      const uploadedUrls = [];

      for (const file of req.files) {
        const filePath = file.path;

        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: `File not found: ${filePath}` });
        }

        // Upload new images to Cloudinary
        const result = await cloudinary.uploader.upload(filePath);

        uploadedUrls.push(result.secure_url);

        // Delete the file from the local server after upload
        fs.unlinkSync(filePath);
      }

      // Update the blog's images with the new URLs
      updateData.image = uploadedUrls;
    }

    // Update the blog with new data (including updated images if any)
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).send("Error updating blog");
  }
};
