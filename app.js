const express = require('express');
const app = express();

const actorRoutes = require('./api/routes/actors');
const movieRoutes = require('./api/routes/movies');
const userRoutes = require('./api/routes/users');

app.use('/actors', actorRoutes);
app.use('/movies', movieRoutes);
app.use('/user', userRoutes);

module.exports = app;