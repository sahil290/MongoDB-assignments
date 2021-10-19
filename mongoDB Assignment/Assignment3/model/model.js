const mongoose = require('mongoose');

const entry = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    }
});

const enter = mongoose.model("Price", entry);
module.exports = enter;