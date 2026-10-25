import { app } from "./app.js";

const PORT = process.env.PORT;
if(!PORT){throw new Error("Port not found")};

app.listen(PORT,() => {return console.log(`server listening at  127.0.0.1:${PORT}`)})