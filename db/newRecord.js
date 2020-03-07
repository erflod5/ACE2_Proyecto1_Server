var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var obj = {
    steps : 0,
    BPM : 89,
    weight : 10.3,
    position : 90,
    luminousIntensity : 3000,
    soundIntensity : 100,
    date : new Date(),
    water : 900,
    location : {
        latitude: 14.607815,
        longitude : -90.551730,
        height : 1505
    }
};

mongo.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}, 
    (error,db)=>{
        if(error){
            console.log(error);
            return;
        }
        var dbo = db.db("iBackPack");
        dbo.collection('records').insertOne(obj,(err,res)=>{
            if(err){
                console.log(error);
                return
            }
            console.log('1 document inserted');
            db.close();
        });
    }
);