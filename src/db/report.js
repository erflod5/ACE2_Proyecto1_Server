const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date : {type : Date, default : Date.now},
    location : {
        latitude : Number,
        longitude : Number,
        height : Number
    }
});

const Report = mongoose.model('Report',reportSchema);

module.exports = Report;  