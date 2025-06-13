import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import cors from 'cors';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

const app = express();
//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1:Allow all origins with default of cors(*)
// app.use(cors());
//Option 2: Allow only specific origins
app.use(cors({
    origin: 'http://localhost:5174',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type'
}));

app.get('/', (req, res) => {
    res.status(234).send("Welcome to Book Store Project"); 
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
