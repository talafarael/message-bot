const { MongoClient } = require("mongodb");

const dbName = "telegram_bot";

const client = new MongoClient(mongoUrl);
let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
  }
  return db;
}

module.exports = { connectDB };
