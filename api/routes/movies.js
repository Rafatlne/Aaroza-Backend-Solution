const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
    Movie
} = require('../models/movie');
const {
    Actor
} = require('../models/actor');


// GET ROUTE
router.get("/", (req, res, next) => {

    Movie.find()
        .select("title year rating actors")
        .exec()
        .then(docs => {

            if (docs) {
                res.status(200).json(docs);
            } else {
                res.status(400).json({
                    message: 'No valid entry found for this route'
                });
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// POST ROUTE
router.post('/', (req, res, next) => {
    const idList = req.body.actorId;
    Actor.find({
            _id: {
                $in: idList,
                $exists: true
            }
        })
        .select("name birthday country")
        .then(docs => {
            if (idList.length === docs.length) {
                const movie = new Movie({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    year: req.body.year,
                    rating: req.body.rating,
                    actors: docs
                });

                movie
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Created Product successfully',
                            createdMovies: {
                                _id: result._id,
                                title: result.title,
                                year: result.year,
                                rating: result.rating,
                                actors: result.actors
                            }
                        });
                    })
            } else {
                res.status(400).json({
                    message: 'Give valid id for Actors'
                });
            }

        })
        .catch(err => {
            res.status(400).json({
                message: err
            });
        });


});



module.exports = router;