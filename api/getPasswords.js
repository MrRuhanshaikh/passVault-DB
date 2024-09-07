const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.Mongo_Uri);
const dbName = "passVault";

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('details');
    const findResult = await collection.find({}).toArray();
    res.status(200).json(findResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.close();
  }
};
