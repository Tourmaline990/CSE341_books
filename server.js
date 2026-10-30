
import { app } from "./app.js";
import { connectToDb ,getDb} from "./src/db/connect.js";


const PORT = process.env.PORT;
if(!PORT){throw new Error("Port not found")};

const startServer = async () => {
    try {
        await connectToDb();
        const db = getDb();

        console.log('Database:', db.databaseName);
        console.log('Collections:', await db.listCollections().toArray());
        console.log('Database:', db.databaseName);

console.log(
    'Collections:',
    await db.listCollections({}, { nameOnly: true }).toArray()
);

console.log(
    'Trails count:',
    await db.collection('trails').countDocuments()
);
        app.listen(  PORT,() => {
            console.log(`server listening at  127.0.0.1:${PORT}`)
        }
        )
    } catch (error) {
        console.error("Database connection failed",error.message)
        process.exit(1)
    }
}

await startServer()

