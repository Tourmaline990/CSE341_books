import { getDb } from "../db/connect.js";


const getAllBooks = async() => {
    const db  = getDb();
    const bookData = await db.collection("books").find({}).toArray();
    return bookData;
}

const getBookById = async(bookId) => {
  const db = getDb();
  const book = await db.collection("books").findOne({id:bookId});
  return book;
}

const getBooksByAuthorId = async(authorId) => {
  const db = getDb();
  const books = await db.collection("books").find({authorId: authorId}).toArray();
  return books;
}

const createBook = async(bookData) => {
  const db = getDb();
  const result = await db.collection("books").insertOne(bookData);
  return result;
}

const updateBook = async(bookId, updatedData) => {
  const db = getDb();
  const result = await db.collection("books").updateOne({ id: bookId }, { $set: updatedData });
  return result;
}

const deleteBook = async(bookId) => {
  const db = getDb();
  const result = await db.collection("books").deleteOne({ id: bookId });
  return result;
}

export {getAllBooks,getBookById,getBooksByAuthorId,createBook,updateBook,deleteBook};