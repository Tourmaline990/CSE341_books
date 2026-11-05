import express from "express";
import router from "./src/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

// middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(router)


app.get("/", (req,res) => {
   return res.status(200).json({"course":"cse341"})
})



export {app} 