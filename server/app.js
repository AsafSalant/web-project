const express = require('express')
const bodyParser = require('body-parser');
const bookingsService = require('./services/bookingsService');
const usersService = require('./services/usersService');

const app = express();
const port = 3000;

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/bookings",async (req,res) => {
    const bookingDocs = await bookingsService.postBooking(req.body);
    res.send(bookingDocs);
});

app.post("/login", async(req,res) => {
    const user = await usersService.login(req.body);
    res.send(user)
});

app.get("/bookings/:name", async (req,res) => {
    const bookingDoc = await bookingsService.findBookingByID(req.params.name);
    res.send(bookingDoc)
});

app.get("/bookings", async (req,res) => {
    const bookingDoc = await bookingsService.getAllBookings();
    res.send(bookingDoc)
});

app.delete("/bookings/:id",async (req,res) => {
    const newBooking = await bookingsService.deleteBookingByID(req.params.id);
    res.send(newBooking);
});

app.put("/bookings/:id",async (req,res) => {
    const newBooking = await bookingsService.updateBookingBy({key:[req.body.key],value:req.body.value},req.params.id);
    res.send(newBooking);
});

app.listen(port, (req,res) => {
    console.log('Good run')
});