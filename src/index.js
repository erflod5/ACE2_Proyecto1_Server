//Librerias, Modulos y Paquetes
const express = require('express');
const cors = require('cors');

//Inicializaciones
const app = express();

//Configuraciones
app.set('port',3000 || process.env.PORT);
app.use(cors());

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//DataBase
require('./db/connection');
const Record = require('./db/record');

const record = new Record({    
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
});

//Rutas
app.get('/api/Record',(req,res)=>{
    Record.find({},(err,records)=>{
        var recordmap = {};
        if(err) throw err;
        records.forEach((record)=>{
            recordmap[record._id] = record;
        })
        res.send(recordmap);
    });
});

app.post('/api/Record',(req,res)=>{
    console.log(req.body);
    res.send({status : true});
})

//Server
var server = app.listen(app.get('port'),()=>{
    console.log('Servidor corriento en el puerto: ' + app.get('port'));
});

