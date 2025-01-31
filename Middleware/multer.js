const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Path to the uploads folder two levels up
const uploadsPath = path.join(__dirname, '../../uploads');

// Create the uploads folder if it doesn't exist
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log(`Uploads folder created at: ${uploadsPath}`);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath); // Save files in the uploads folder two levels up
  },
  filename: function (req, file, cb) {
    // Use the blog title from the request body as the image name
    const blogTitle = req.body.title || 'blog'; // Default to 'blog' if title is not provided
    const sanitizedTitle = blogTitle.replace(/[^a-zA-Z0-9]/g, '-'); // Replace special characters with hyphens
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Add a unique suffix to avoid conflicts
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileName = `${sanitizedTitle}-${uniqueSuffix}${fileExtension}`; // Construct the file name
    cb(null, fileName);
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;