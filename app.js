const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const actorRoutes = require('./api/routes/actors');
const movieRoutes = require('./api/routes/movies');
const userRoutes = require('./api/routes/users');

// Mongoose Connect
mongoose.connect('mongodb://node-aaroza:'+
    process.env.MONGO_ATLAS_PW+
    '@node-aaroza-shard-00-00-mkjpe.mongodb.net:27017,node-aaroza-shard-00-01-mkjpe.mongodb.net:27017,node-aaroza-shard-00-02-mkjpe.mongodb.net:27017/test?ssl=true&replicaSet=node-aaroza-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true 
    });
    
mongoose.Promise = global.Promise;


// Using morgan package
app.use(morgan('dev'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin"
        ,"Origin, X-Requsted-With, Content-Type, Accept, Authorization");

        if (req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'GET,PUT, POST, PATCH, DELETE');
            return res.status(200).json({});
        }
    
        next();
});

// Routes which should handle requests
app.use('/actors', actorRoutes);
app.use('/movies', movieRoutes);
app.use('/user', userRoutes);


// Error Handling 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404 ;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error : {
            message: err.message
        }
    })
});


module.exports = app;