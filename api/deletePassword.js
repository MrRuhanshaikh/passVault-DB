const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.Mongo_Uri);
const dbName = "passVault";

module.exports = async (req, res) => {
  const password = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('details');
    const result = await collection.deleteOne(password);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  } finally {
    await client.close();
  }
};
