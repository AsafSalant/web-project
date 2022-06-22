const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");   
const moment = require("moment");
const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});

const convertStringToDate = (string) => {
    const [day, month, year] = string.split('/');
    return new Date(+year, month - 1, +day);
};


async function getAllBookings() {
    await client.connect();

    const findAllBookings = await client
    .db("web-project").collection("bookings")
    .find().toArray()

    await client.close();

    return findAllBookings;
}

async function findBookingByEmail(bookingOBJ) {
    await client.connect();

    const findBooking = await client
    .db("web-project").collection("bookings")
    .findOne({email: bookingOBJ.email});
    // .findOne({"_id": new ObjectId(value)});

    await client.close();

    return findBooking;
}

async function postBooking(bookingOBJ) {
    await client.connect();

    // Convert 07/01/2022 string to DATE date type
    const dateSplit = bookingOBJ.daterange.split(" ");
    const startDateString = dateSplit[0];
    const endDateString = dateSplit[dateSplit.length - 1];

    const startDate = convertStringToDate(startDateString);
    const endDate = convertStringToDate(endDateString);

    delete bookingOBJ.daterange;
    // end of convert to date type.
    
    bookingOBJ.startDate = startDate
    bookingOBJ.endDate = endDate
    bookingOBJ.createdDate = new Date();

    const postBookingOBJ = await client
    .db("web-project").collection("bookings")
    .insertOne(bookingOBJ);

    await client.close();

    return postBookingOBJ;
}

async function deleteBookingByID(value) {
    await client.connect();

    const deleteBooking = await client
    .db("web-project").collection("bookings")
    .deleteOne({"_id": new ObjectId("62addcc2dc1ab5b03c316859")});

    await client.close();

    return deleteBooking;
}

async function updateBookingBy(updateOBJ,id) {
    await client.connect();

    const updateBooking = await client
    .db("web-project").collection("bookings")
    .updateOne({"_id": new ObjectId(id)},{$set: {[updateOBJ.key]:updateOBJ.value}});

    await client.close();

    return updateBooking;
}

module.exports = {
    findBookingByEmail,
    postBooking,
    deleteBookingByID,
    getAllBookings,
    updateBookingBy
}