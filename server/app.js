const express = require('express')
const bodyParser = require('body-parser');
const bookingsService = require('./services/bookingsService');

const app = express();
const port = 3000;

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/booking",(req,res) => {
    console.log(req.body);
});

app.get("/booking/:name", async (req,res) => {
    const bookingDoc = await bookingsService.findBookingBy("name",req.params.name);
    res.send(bookingDoc)
});

app.listen(port, (req,res) => {
    console.log('Good run')
});