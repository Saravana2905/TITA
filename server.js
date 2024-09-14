const mongoose = require('mongoose');
const express = require('express');
const contactRoute = require('./Routes/contact_Router');
const careerRoute = require('./Routes/career_Router');
const adminRoute = require('./Routes/admin_route');
const blogRoute = require('./Routes/blog_route');

const app = express();
const cors = require('cors')



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

// for understanding the given input is in json
app.use(express.json());
// app.use(authenticatetoken);

//Route
 app.use('/contact', contactRoute);
 app.use('/career', careerRoute);
 app.use('/admin', adminRoute);
 app.use('/blog', blogRoute);




mongoose.
connect('mongodb+srv://admin:admin123@cluster0.mbkdi.mongodb.net/TITA?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(4000, ()=> {
        console.log(`Node API app is running on port 4000`)
        console.log(`http://localhost:4000`)
    });
}).catch((error) => {
    console.log(error)
})
