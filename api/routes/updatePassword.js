const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = import.meta.env.VITE_Mongo_Uri;
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

// POST Update Password
router.post('/', async (req, res) => {
  const password = req.body;
  const collection = req.db.collection('details');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

module.exports = router;
