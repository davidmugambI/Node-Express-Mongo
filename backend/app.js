const express = require('express');



const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const recipeRoutes = require('./routes/accessrecipe');

const app = express();

mongoose.connect('mongodb+srv://david:4bzw2XtzGxyO4V6C@cluster0-c82bd.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
  console.log("Successfully connected to mongo db atlas");
})
.catch((error)=>{
  console.log('Unable to connect to Mongo db atlas');
  console.log(error);
})

//export to access outside this file
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json());

app.use('/api/recipes', recipeRoutes)


module.exports = app;