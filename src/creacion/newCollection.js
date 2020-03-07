var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongo.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }, 
    function(err, db) {
        if (err) throw err;
        var dbo = db.db("iBackPack");
        dbo.createCollection("records", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
}); 