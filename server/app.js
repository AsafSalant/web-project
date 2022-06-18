const express = require('express')
const bodyParser = require('body-parser');
const bookingsService = require('./services/bookingsService');

const app = express();
const port = 3000;

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/bookings",async (req,res) => {
    const bookingDocs = await bookingsService.getAllBookings(req.body);
    res.send(bookingDocs);
});

app.get("/bookings/:name", async (req,res) => {
    const bookingDoc = await bookingsService.findBookingBy("name",req.params.name);
    res.send(bookingDoc)
});

app.get("/bookings", async (req,res) => {
    const bookingDoc = await bookingsService.findBookingBy("name",req.params.name);
    res.send(bookingDoc)
});

app.delete("/bookings/:id",async (req,res) => {
    const newBooking = await bookingsService.deleteBookingByID(req.params.id);
    res.send(newBooking);
});

app.put("/bookings/:id",async (req,res) => {
    const newBooking = await bookingsService.updateBookingBy({[req.body.key]:req.body.value},{"_id":ObjectId(req.params.id)});
    res.send(newBooking);
});

app.listen(port, (req,res) => {
    console.log('Good run')
});