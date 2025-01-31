const team = require('../Model/teamModel');
const upload = require('../Middleware/multer'); // Import Multer configuration

exports.createTeam = async (req, res) => {
  try {
    upload.single('Image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const { sno, Name, Position, Experience, ExperienceNo, Key_responsibilities, Specialization, Vision, instagram, facebook, linkedin } = req.body;

      // Construct the image URL
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      // Create new team member
      const newTeamMember = new team({
        sno,
        Name,
        Position,
        Experience,
        ExperienceNo,
        Key_responsibilities,
        Specialization,
        Vision,
        Image: imageUrl,
        instagram, 
        facebook, 
        linkedin
      });

      // Save to database
      await newTeamMember.save();

      res.status(201).json({ message: 'Team member created successfully', data: newTeamMember });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllTeam = async (req, res) =>{
    try {
        const team = await team.find();
        res.status(200).json({success: true,
            message: "All Team Members data Fetched", 
            data: team});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });    
    }
}