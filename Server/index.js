const express = require('express');
// require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const webRoutes = require('./Routes/webRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();

// middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(express.json());


// database connection
mongoose.connect('mongodb+srv://hny:123@akhi.fgsqn.mongodb.net/hny?retryWrites=true&w=majority&appName=akhi')
  .then((result) => app.listen(3000,(req,res)=>{
    console.log('mongodb connected and started');
  }))
  .catch((err) => console.log(err));

// app.get('*', checkUser);



app.use(webRoutes);