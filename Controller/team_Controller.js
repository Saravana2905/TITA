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

      // Check if a team member with the same sno already exists
      const existingTeamMember = await team.findOne({ sno });
      if (existingTeamMember) {
        return res.status(400).json({ message: 'Team member with this serial number already exists' });
      }

      // Construct the image URL
      const imageUrl = `${req.protocol}://${req.get('host')}/tita/${req.file.filename}`;

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

exports.updateTeam = async (req, res) => {
  try {
    upload.single('Image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const { id } = req.params; // Get the team member ID from the request params
      const { sno, Name, Position, Experience, ExperienceNo, Key_responsibilities, Specialization, Vision, instagram, facebook, linkedin } = req.body;

      // Find the existing team member by ID
      const existingTeamMember = await team.findById(id);
      if (!existingTeamMember) {
        return res.status(404).json({ message: 'Team member not found' });
      }

      // Check if the new sno already exists (excluding the current team member)
      if (sno && sno !== existingTeamMember.sno) {
        const duplicateSno = await team.findOne({ sno });
        if (duplicateSno) {
          return res.status(400).json({ message: 'Team member with this serial number already exists' });
        }
      }

      // Update the team member's fields
      existingTeamMember.sno = sno || existingTeamMember.sno;
      existingTeamMember.Name = Name || existingTeamMember.Name;
      existingTeamMember.Position = Position || existingTeamMember.Position;
      existingTeamMember.Experience = Experience || existingTeamMember.Experience;
      existingTeamMember.ExperienceNo = ExperienceNo || existingTeamMember.ExperienceNo;
      existingTeamMember.Key_responsibilities = Key_responsibilities || existingTeamMember.Key_responsibilities;
      existingTeamMember.Specialization = Specialization || existingTeamMember.Specialization;
      existingTeamMember.Vision = Vision || existingTeamMember.Vision;
      existingTeamMember.instagram = instagram || existingTeamMember.instagram;
      existingTeamMember.facebook = facebook || existingTeamMember.facebook;
      existingTeamMember.linkedin = linkedin || existingTeamMember.linkedin;

      // If a new image is uploaded, update the image URL
      if (req.file) {
        const newImageUrl = `${req.protocol}://${req.get('host')}/tita/${req.file.filename}`;
        existingTeamMember.Image = newImageUrl;
      }

      // Save the updated team member
      await existingTeamMember.save();

      res.status(200).json({
        message: 'Team member updated successfully',
        data: existingTeamMember,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};