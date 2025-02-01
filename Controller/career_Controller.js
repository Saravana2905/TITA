const { Career, CareerUserDetail } = require("../Model/career_Model");
const upload = require('../Middleware/multer'); // Import Multer configuration

//create a career
exports.createCareer = async (req, res) => {
  try {
    const { title, desc, exp } = req.body;

    const career = await Career.create({
      title,
      desc,
      exp,
    });
    res.status(200).json(career);
  } catch (error) {
    console.error("Error creating career:", error.message);
    res.status(500).send("Error creating career");
  }
};

//create career user details
exports.createCareerUserDetails = async (req, res) => {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    });
    const { name, email, mobile, location, yourmessage, exp, role, address} = req.body;

    // Construct the image URL
    const fileurl = `https://tita.itrain.io/tita/${req.file.filename}`;

    const careerUser = await CareerUserDetail.create({
      name,
      email,
      mobile,
      location,
      yourmessage,
      exp,
      role,
      address,
      cv: fileurl,
    });
    res.status(200).json(careerUser);
  } catch (error) {
    console.error("Error creating career:", error.message);
    res.status(500).send("Error creating career");
  }
};

// get career user details
exports.getCareerUserDetails = async (req, res) => {
  try {
    const career = await CareerUserDetail.find({});
    const totalCareerUserDetail = await CareerUserDetail.countDocuments(); // Await the countDocuments function
    res.status(200).json({ totalCareerUserDetail, career });
  } catch (error) {
    console.error("Error getting career User details:", error.message);
    res.status(500).send("Error getting career user details");
  }
};


//delete career user details

exports.deleteCareerUserDetails = async (req,res) =>{
  try {
    const {id} = req.params;
    const career = await CareerUserDetail.findByIdAndDelete(id);
    if (!career){
      return res.status(404).json({ message: `cannot find by id ${id}` });
    }
    res.status(200).json(career);
  } catch (error) {
    console.error("Error getting career User details:", error.message);
    res.status(500).send("Error getting career user details");
  }
}



// get career
exports.getCareer = async (req, res) => {
    try {
      const career = await Career.find({});
      const totalCareer = await Career.countDocuments(); // Await the countDocuments function
      res.status(200).json({ totalCareer, career });
    } catch (error) {
      console.error("Error getting career:", error.message);
      res.status(500).send("Error getting career");
    }
  };
  

//delete career
exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      return res.status(404).json({ message: `cannot find by id ${id}` });
    }
    res.status(200).json(career);
  } catch (error) {
    console.error("Error deleting career:", error.message);
    res.status(500).send("Error deleting career");
  }
};

//update career
exports.updateCareer = async (req, res) => {
    try {
      const { id } = req.params;
      const career = await Career.findByIdAndUpdate(id, req.body);
      if (!career) {
        return res.status(404).json({ message: `cannot find by id ${id}` });
      }
      const updatedCareer = await Career.findById(id);
      res.status(200).json(updatedCareer);
    } catch (error) {
      console.error("Error updating career:", error.message);
      res.status(500).send("Error updating career");
    }
  };
  


