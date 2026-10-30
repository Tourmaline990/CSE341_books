import { MongoClient } from "mongodb";

let database;

const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URL;
    if(!connectionString){
      throw new Error('Mongo_db url is required');
    }
    const client = new MongoClient(connectionString);
    await client.connect();
    database = await client.db(process.env.DB_USERNAME || 'practice')
    return database;
}

const getDb = () => {
    if(!database){
      throw new Error("Database not initialized, call connectToDb");
    }
    return database;
}

export {connectToDb, getDb}