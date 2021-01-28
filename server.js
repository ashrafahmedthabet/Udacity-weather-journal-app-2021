// Setup empty JS object to act as endpoint for all routes
projectData = {};
// require dotenv
require('dotenv').config()

// Require Express to run server and routes
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');

// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(process.env.PORT,()=>{console.log(`Server Running On: http://localhost:${process.env.PORT}`);});

// GET route
app.get('/all', (request, response)=> {
  response.send(projectData);
});
// Post route 
app.post('/postData', (request, response) => {
    projectData={
        date:request.body.date,
        temp:request.body.temp,
        content:request.body.content
    };
    response.send("post receive");
});