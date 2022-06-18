const express = require('express')
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
const port = 3000;

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = client.db('web-project');
const bookingsColl = database.collection('bookings');

app.post("/booking",(req,res) => {
    console.log(req.body);
});

app.get("/booking/:name", async (req,res) => {
    await client.connect();
    const listOfBookings = await bookingsColl.findOne({name:req.params.name});
    await client.close()
    res.send(listOfBookings)
});

app.listen(port, (req,res) => {
    console.log('Good run')
});