import express from "express";
import router from "./src/router.js";

const app = express();

// middlewares
app.use(express.json());
app.use(router)


app.get("/", (req,res) => {
   return res.status(200).json({"course":"cse341"})
})



export {app} 