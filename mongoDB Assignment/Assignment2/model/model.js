const mongoose = require('mongoose');

const entry = new mongoose.Schema({
    quote : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
});

const enter = mongoose.model("Quotes", entry);
module.exports = enter;