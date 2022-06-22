const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");   
const moment = require("moment");
const uri = "mongodb+srv://asaf-salant:Sal85208520@web-project.bvep98x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});


async function login(userOBJ) {
    await client.connect();

    const findUser = await client
    .db("web-project").collection("users")
    .findOne({username: userOBJ.username});
    
    if (findUser === null) return null;


    await client.close();
    return findUser;
} 

module.exports = {
    login
}