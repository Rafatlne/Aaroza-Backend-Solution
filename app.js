const express = require('express');
const app = express();
const morgan = require('morgan');

const actorRoutes = require('./api/routes/actors');
const movieRoutes = require('./api/routes/movies');
const userRoutes = require('./api/routes/users');

// Using morgan package
app.use(morgan('dev'));

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