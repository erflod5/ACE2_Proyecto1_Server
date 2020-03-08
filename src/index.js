//Librerias, Modulos y Paquetes
const express = require("express");
const cors = require("cors");

//Inicializaciones
const app = express();

//Configuraciones
app.set("port", 3000 || process.env.PORT);
app.use(cors());

//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DataBase
require("./db/connection");
const Record = require("./db/record");

var record = new Record({
  steps: 100,
  BPM: 89,
  weight: 10.3,
  position: 90,
  luminousIntensity: 3000,
  soundIntensity: 100,
  date: new Date("2020-03-03:10:40Z"),
  water: 900,
  location: {
    latitude: 14.607815,
    longitude: -90.55173,
    height: 1505
  }
});

//Rutas
app.get("/api/Record", (req, res) => {
  Record.find({}, (err, records) => {
    var recordmap = {};
    if (err) throw err;
    records.forEach(record => {
      recordmap[record._id] = record;
    });
    res.send(recordmap);
  });
});

app.post("/api/Record", (req, res) => {
  record = new Record(req.body);
  console.log(record);
  record.save((err, rec) => {
    if (err) {
      res.send({ status: false });
      throw err;
    }
    console.log(rec);
    res.send({ status: true });
  });
});

//Server
var server = app.listen(app.get("port"), () => {
  console.log("Servidor corriento en el puerto: " + app.get("port"));
});

/*//Pasos por hora, dia, semana
Record.find({"date" : {"$gte" : start, "$lte" : end}})
    .select('date steps')
    .exec((err,records)=>{
    if(err)
        throw err;
    console.log(records);
});
*/
var start = new Date('2020-03-03:00:00Z');
var end = new Date('2020-03-20T23:59:59Z');

function pasosFiltro(start, end,filtro){
  Record.aggregate(
    [
      {
        $match: { date: { $gte: start, $lte : end} }
      },
      {
        $group: {
          _id: { $dateToString: { format: filtro, date: "$date" } },
          totalStep: {
            $sum: "$steps"
          },
        }
      },
      {
        $sort: { _id: 1 }
      }
    ],
    (err, res) => {
      if (err) throw err;
      console.log(res);
    }
  );
}

pasosFiltro(start,end,'%Y-%m-%d');

pasosFiltro(start,end,'%Y-%m-%d %H');