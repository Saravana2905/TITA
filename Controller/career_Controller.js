const {Career, CareerUserDetail} = require('../Model/career_Model')
// const CUD = require('../Model/career_Model')

//create a career 
exports.createCareer = async(req,res)=> {
    try {
        const {title, desc, exp} = req.body;

        const career = await Career.create({
            title,
            desc,
            exp
        });
        res.status(200).json(career)
    } catch (error) {
        console.error("Error creating career:", error.message);
        res.status(500).send("Error creating career");
    }
}


//create career user details
exports.createCareerUserDetails = async(req,res)=>{
    try {
        const {name, email, mobile, location, salary, exp, role} = req.body;
        const careerUser = await CareerUserDetail.create({
            name, email, mobile, location, salary, exp, role
        });
        res.status(200).json(careerUser);
          
    } catch (error) {
        console.error("Error creating career:", error.message);
        res.status(500).send("Error creating career");
    }
}


//get career
exports.getCareer = async(req,res)=> {
    try {
        const career = await Career.find({});
        res.status(200).json(career)
    } catch (error) {
        console.error("Error getting career:", error.message);
        res.status(500).send("Error getting career");
    }
}

// module.exports = {createContact}