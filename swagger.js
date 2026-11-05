import {writeFileSync} from 'node:fs';
import swaggerJSDoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books API',
            version: '1.0.0',
            description: 'A simple API for managing books',
           },
        servers: [
            {
                url: '/',
                description: 'Current Server',
            },
        ],
    },
    apis: ['./src/router.js', './app.js'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger document generated");