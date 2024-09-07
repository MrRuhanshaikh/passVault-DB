const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const dbName = "passVault";
const client = new MongoClient(url);

// Middleware to connect to the database
router.use(async (req, res, next) => {
  try {
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

// DELETE Remove Password
router.delete("/", async (req, res) => {
  const { id } = req.body;
  console.log('Delete request received for ID:', id); // Log received ID
  try {
    const db = client.db(dbName);
    const collection = db.collection('details');
    const result = await collection.deleteOne({ id });
    console.log('Delete result:', result); // Log delete result
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Password not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});


// Gracefully handle shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await client.close();
  process.exit(0);
});

module.exports = router;
