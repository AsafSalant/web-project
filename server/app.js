const express = require('express')
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
const app = express();
const port = 3000;

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = client.db('web-project');
const bookings = database.collection('bookings');

app.post("/booking",(req,res) => {
    console.log(req.body);
});

async function run() {
    try {
        const query = { name: 'asaf' };
        const booking = await bookings.findOne(query);
        console.log(booking);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

run().catch(console.dir);

app.listen(port, (req,res) => {
    console.log('Good run')
});