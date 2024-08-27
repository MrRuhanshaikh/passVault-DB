const express = require("express");
const { MongoClient } = require("mongodb");

var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
const port = 3000;
app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passVault";

client.connect();

// get Password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('details');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
});
//save Password
app.post("/", async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('details');
    const findResult = await collection.insertOne(password);
    res.send({sucess:true,result:findResult})
  });
//Delete Password
app.delete("/", async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('details');
    const findResult = await collection.deleteOne(password);
    res.send({sucess:true,result:findResult})
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
