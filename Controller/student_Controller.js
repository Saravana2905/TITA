const Student = require('../Model/student_Model')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createStudent = async(req,res)=>{
    try {
        const {username, email, password, confirmPassword} = req.body;
    const student = await Student.create({username, email, password, confirmPassword})
    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password and confirm password do not match"
        })
    }   
    res.status(201).json({
        success: true,
        message: "student created successfully",
        student
    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Here you would typically compare the password with a hashed password
        // For simplicity, we are assuming the password is stored in plain text
        if (student.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const StudentToken = jwt.sign({ id: student._id }, process.env.JWT_SECRET_STUDENT, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "Login successful",
            StudentToken,
            student: {
                username: student.username,
                email: student.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

