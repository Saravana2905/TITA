const Admin = require('../Model/admin_Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Admin create
exports.createAdmin = async (req, res) => {
    try {
        const { email, password   } = req.body;

        // Validate that password is provided
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            email,
            password: hashedPassword
        });

        // Generate JWT token after admin creation
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET_ADMIN, { expiresIn: '30d' });

        // Send response with admin details and JWT
        res.status(200).json({
            admin,
            token
        });
    } catch (error) {
        console.error("Error creating admin:", error.message);
        res.status(500).send("Error creating admin");
    }
};

// Admin login (getAdmin)
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Send response without JWT
        res.status(200).json({
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error logging in admin:", error.message);
        res.status(500).send("Error logging in admin");
    }
};

