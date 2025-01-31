const Blog = require("../Model/blog_Model");
const upload = require("../Middleware/multer  "); // Import Multer configuration
const path = require('path');

// Create Blog
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

      // Construct the image URL
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(filePath)}`;
      uploadedUrls.push(imageUrl);
    }

    const blog = await Blog.create({
      title,
      desc,
      image: uploadedUrls,
    });

    res.status(200).json({
      message: "Images uploaded to local storage and blog created successfully",
      blog,
      urls: uploadedUrls, // Array of image URLs
    });
  } catch (error) {
    console.error("Error during blog creation:", error.message);
    res.status(500).json({
      error: "Blog creation failed",
      details: error.message,
    });
  }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const totalBlogs = blogs.length;

    res.status(200).json({
      success: true,
      totalBlogs,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
    });
  }
};

// Get Blog by ID
exports.getBlogsById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: `Blog not found with id ${id}` });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
    });
  }
};

// Delete Blog
exports.deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: `Cannot find blog with id ${id}` });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
    });
  }
};

// Update Blog
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

        // Construct the image URL
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(filePath)}`;
        uploadedUrls.push(imageUrl);
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