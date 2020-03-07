const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    steps : Number,
    BPM  : Number,
    weight : Number,
    position : Number,
    luminousIntensity : Number,
    soundIntensity : Number,
    date : {type : Date, default : Date.now},
    water : Number,
    location : {
        latitude : Number,
        longitude : Number,
        height : Number
    }
});

const Record = mongoose.model('Record',recordSchema);

module.exports = Record;