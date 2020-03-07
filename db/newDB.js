const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/iBackPack';

mongo.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    },(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("Database created!");
        client.close();
    }
);