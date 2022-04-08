import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Reminiscene API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL || 'mongodb://Tirthak:memories@cluster0-shard-00-00.xjpiv.mongodb.net:27017,cluster0-shard-00-01.xjpiv.mongodb.net:27017,cluster0-shard-00-02.xjpiv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-o9w3ip-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(()=> app.listen(PORT, ()=> console.log(`server running on port: ${PORT} `)))
    .catch((error)=> console.log(error.message));
