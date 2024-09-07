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

// GET Passwords
router.get('/', async (req, res) => {
  const collection = req.db.collection('details');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

module.exports = router;