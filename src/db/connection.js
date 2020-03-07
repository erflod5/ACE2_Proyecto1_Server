const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser:true, useUnifiedTopology:true});

var db = mongoose.connection;
db.on('open',()=>console.log('Successfully mongodb'));