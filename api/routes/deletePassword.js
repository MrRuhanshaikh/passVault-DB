const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = process.env.Mongo_Uri;
const dbName = "passVault";
const client = new MongoClient(url);

// Middleware to connect to the database
router.use(async (req, res, next) => {
  if (!client.isConnected()) {
    await client.connect();
  }
  req.db = client.db(dbName);
  next();
});

// DELETE Password
router.delete('/', async (req, res) => {
  const password = req.body;
  const collection = req.db.collection('details');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

module.exports = router;


