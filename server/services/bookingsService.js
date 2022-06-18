const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");   

const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});

async function getAllBookings() {
    await client.connect();

    const findAllBookings = await client
    .db("web-project").collection("bookings")
    .find().toArray()

    await client.close();

    return findAllBookings;
}

async function findBookingByID(value) {
    await client.connect();

    const findBooking = await client
    .db("web-project").collection("bookings")
    .findOne({"_id": new ObjectId(value)});

    await client.close();

    return findBooking;
}

async function postBooking(bookingOBJ) {
    await client.connect();

    const postBooking = await client
    .db("web-project").collection("bookings")
    .insertOne(bookingOBJ);

    await client.close();

    return postBooking;
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
    console.log('updateOBJ',updateOBJ.key);
    const updateBooking = await client
    .db("web-project").collection("bookings")
    .updateOne({"_id": new ObjectId(id)},{$set: {[updateOBJ.key]:updateOBJ.value}});

    await client.close();

    return updateBooking;
}

module.exports = {
    findBookingByID,
    postBooking,
    deleteBookingByID,
    getAllBookings,
    updateBookingBy
}