const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});

async function findBookingByName(name) {
    await client.connect();

    const findBooking = await client
    .db("web-project").collection("bookings")
    .findOne({name});

    await client.close();

    return findBooking;
}

module.exports = {findBookingByName}