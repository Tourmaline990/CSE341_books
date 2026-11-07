import { getDb } from "../db/connect.js";

const getAllAuthors = async() => {
    const db  = getDb();
    const authorData = await db.collection("authors").find({}).toArray();
    return authorData;
}

const getAuthorById = async(authorId) => {
  const db = getDb();
  const author = await db.collection("authors").findOne({authorId:authorId});
  return author;
}

const createAuthor = async(authorData) => {
  const db = getDb();
  const result = await db.collection("authors").insertOne(authorData);
  console.log(result);
  return result;
}

const updateAuthor = async(authorId, updatedData) => {
  const db = getDb();
  const result = await db.collection("authors").updateOne({ authorId: authorId }, { $set: updatedData });
  return result;
}

const deleteAuthor = async(authorId) => {
  const db = getDb();
  const result = await db.collection("authors").deleteOne({ authorId: authorId });
  return result;
}

export {getAllAuthors,getAuthorById,createAuthor,updateAuthor,deleteAuthor};