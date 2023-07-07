import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import 'dotenv/config';

import router from './router/router.js';
import { webhook } from "./utils/webhook.js";
import errorHandler from "./error/errorHandler.js";

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Mongoose DB successfully connected...'))
    .catch((err) => console.log('DB Error:', err))

const app = express();

app.use(cors());

app.post('/api/webhook', express.raw({ type: 'application/json' }), webhook);

app.use(express.json());
app.use('/api', router);

app.use('/api/image', express.static('uploads'));
app.use(errorHandler);

const PORT = process.env.PORT || 4005;
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server has been started on port ${PORT}...`)
});