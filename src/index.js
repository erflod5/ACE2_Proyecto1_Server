//Librerias, Modulos y Paquetes
const express = require("express");
const cors = require("cors");
const http = require('http');

//Inicializaciones
const app = express();
const server = http.createServer(app);

const WebSocket = require('ws');
const socket = new WebSocket.Server({server});

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
  record.save((err, rec) => {
    if (err) {
      res.send({ status: false });
      throw err;
    }
    console.log(rec);
    res.send({ status: true });
  });
});

//?start=2020-03-03&end=2020-03-20&format=%Y-%m-%d:%H
app.get('/api/Steps',(req, res)=>{
  let start = new Date(0);
  let end = new Date();
  let filtro = '%Y-%m-%d';

  if(req.query.start)
    start = new Date(req.query.start);
  if(req.query.end)
    end = new Date(req.query.end);
  if(req.query.filtro)
    filtro = req.query.format;
  console.log(end);
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
    (err, rec) => {
      if (err) throw err;
      console.log(rec);
      res.send(rec);
    }
  );
});

app.post('/api/modoRobo',(req,res) => {
  console.log(req.body);
  res.send({status : true});
});

//Socket
socket.on('connection', function (ws, req) {
  ws.on('message', function (message) {
    console.log("Received: " + message);
    s.clients.forEach(function (client) {
      if (client != ws && client.readyState) {
        client.send(message);
      }
    });
  });
  ws.on('close', function () {
    console.log("lost one client");
  });
  console.log("new client connected");
});

server.listen(app.get('port'),()=>{
  console.log("Servidor corriento en el puerto: " + app.get("port"));
});