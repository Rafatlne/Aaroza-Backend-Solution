const {
    Actor,
    actorSchema
} = require("./actor");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String
    },
    year: {
        type: String
    },
    rating: {
        type: Number
    },
    actors: [actorSchema]
});

// module.exports = mongoose.model("Movie", movieSchema);
const Movie = mongoose.model("Movie", movieSchema);

module.exports.Movie = Movie;