const Contact = require('../Model/contact_Model')

//create a contact 
exports.createContact = async(req,res)=> {
    try {
        const {name, email, mobile, message} = req.body;

        const contact = await Contact.create({
            name,
            email,
            mobile,
            message
        });
        res.status(200).json(contact)
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).send("Error sending message");
    }
}

exports.getContact = async(req,res)=> {
    try {
        const contact = await Contact.find({});
        const totalContact = await Contact.countDocuments();
        res.status(200).json({totalContact,contact})
    } catch (error) {
        console.error("Error getting message:", error.message);
        res.status(500).send("Error getting message");
    }
}

//delete contact
exports.deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).json({ message: `cannot find by id ${id}` });
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error("Error deleting contact:", error.message);
      res.status(500).send("Error deleting contact");
    }
  };

// module.exports = {createContact}