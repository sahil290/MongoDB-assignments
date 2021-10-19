const mongoose = require('mongoose');

const entry = new mongoose.Schema({
    name : {
        type : String,
    },
    collegeName : {
        type : String,
    },
    location : {
        type : String,
    }
});

const enter = mongoose.model("Student", entry);
module.exports = enter;