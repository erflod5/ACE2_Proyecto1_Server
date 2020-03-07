var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongo.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, 
    (error,db)=>{
        if(error){
            console.log(error);
            return;
        }
        var dbo = db.db("iBackPack");
        dbo.collection('records').find().toArray((err,res)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(res[0]);
            db.close();
        });
    }
);