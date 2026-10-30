import { MongoClient } from "mongodb";

let database;

const connectToDb = async () => {
  try {
    const connectionString = process.env.MONGODB_URL;

    if (!connectionString) {
      throw new Error('MONGODB_URL is required.');
    }

    const client = new MongoClient(connectionString);

    console.log("Client created");

    await client.connect();

    console.log("Client connected");

    database = client.db(process.env.DB_NAME || 'Practice');

    return database;

  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

const getDb = () => {
    if(!database){
      throw new Error("Database not initialized, call connectToDb");
    }
    return database;
}

export {connectToDb, getDb}