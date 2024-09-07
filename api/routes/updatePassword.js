const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL and Database Name
const url = process.env.MONGODB_URI;
const dbName = "passVault";
const client = new MongoClient(url); // No deprecated options

// Middleware to connect to the database
router.use(async (req, res, next) => {
  try {
    // Ensure the client is connected before handling requests
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log('Connected to MongoDB');
    }
    
    req.db = client.db(dbName);
    next();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
});

router.post("/", async (req, res) => {
  const password = req.body;
  console.log('Received data:', password); // Log received data
  try {
      const db = client.db(dbName);
      const collection = db.collection('details');
      const result = await collection.insertOne(password);
      console.log('Insert result:', result); // Log insert result

      if (result.insertedCount === 0) {
          return res.status(500).json({ error: 'Failed to insert password' });
      }

      res.status(200).json({ success: true, result });
  } catch (error) {
      console.error('Error saving password:', error);
      res.status(500).json({ error: 'Failed to save data' });
  }
});

// Gracefully handle shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await client.close();
  process.exit(0);
});

module.exports = router;
