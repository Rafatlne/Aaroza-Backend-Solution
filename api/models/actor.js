const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    birthday: {
        type: String
    },
    country: {
        type: String
    }
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports.Actor = Actor;
module.exports.actorSchema = actorSchema;