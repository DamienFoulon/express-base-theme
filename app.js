// Libs
import express from 'express';
import { MongoClient } from "mongodb";
import pino from "pino";
import {pinoHttp} from "pino-http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Config
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const HOST = process.env.EXPRESS_APP_HOST|| 'localhost';
const PORT = process.env.EXPRESS_APP_PORT || 8000;
const HTTPS = process.env.EXPRESS_APP_HTTPS || false;
const CLIENT_HOST = process.env.REACT_APP_HOST || 'localhost';
const CLIENT_PORT = process.env.REACT_APP_PORT || 3000;
const app = express();
const mongoClient = new MongoClient(MONGO_URL);
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',

});


const pinoMiddleware = pinoHttp({
    logger,
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            translateTime: 'SYS:standard',
            colorize: true,
        }
    },
});


// Utils
import { disconnectServer } from './utils/server.js';
import { mongoConnect } from './utils/mongodb.js';

// Middlewares
app.use(pinoMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: HTTPS ? `https://${CLIENT_HOST}:${CLIENT_PORT}` : `http://${CLIENT_HOST}:${CLIENT_PORT}`,
}));

// Router
import { indexRouter } from './routes/indexRouter.js';

// Routes
app.use('/', indexRouter);
app.use((err, req, res, next) => {
    req.log.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
})

// Server
async function startServer() {
    // Connect to MongoDB
    await mongoConnect();
    // Start the server
    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    });

    // Handle disconnect when the application is shutting down
    process.on('SIGINT', async () => {
        await disconnectServer(app);
    });

    process.on('SIGTERM', async () => {
        await disconnectServer(app);
    });
}

startServer();