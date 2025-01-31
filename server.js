const mongoose = require('mongoose');
const express = require('express');
const contactRoute = require('./Routes/contact_Router');
const careerRoute = require('./Routes/career_Router');
const adminRoute = require('./Routes/admin_route');
const blogRoute = require('./Routes/blog_route');
const teamRoute = require('./Routes/teamRoutes');
const path = require('path');
const port = 5000

const app = express();
const cors = require('cors')



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

// Path to the uploads folder two levels up
const uploadsPath = path.join(__dirname, '../../tita');

// for understanding the given input is in json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.use(authenticatetoken);

//Route
 app.use('/contact', contactRoute);
 app.use('/career', careerRoute);
 app.use('/admin', adminRoute);
 app.use('/blog', blogRoute);
// Serve static files from the uploads folder
app.use('/tita', express.static(uploadsPath));
app.use('/team', teamRoute);


mongoose.
connect('mongodb+srv://admin:admin123@cluster0.mbkdi.mongodb.net/TITA?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, ()=> {
        console.log(`Node API app is running on port ${port}`)
        console.log(`http://localhost:${port}`)
    });
}).catch((error) => {
    console.log(error)
})
