import { getDb } from "../db/connect.js";

const getAllBooks = async() => {
    const db  = getDb();
    const bookData = await db.collection("books").find({}).toArray();
    return bookData;
}

export {getAllBooks}