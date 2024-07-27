const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
    path: './config/congig.env' // Ensure correct path
});

connectDatabase();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog Api',
            version: '1.0.0',
            description: 'API documentation for your Express application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`, // Use environment variable for port
            },
        ],
    },
    apis: ['./Routers/*.js'], // Adjust path as needed
};

const swaggerSpec = swaggerJsDocs(options);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());
app.use("/", IndexRoute);
app.use(customErrorHandler);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.send("Getting Data");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Logged Error : ${err}`);
    server.close(() => process.exit(1));
});
