// Import the Express framework for creating the server
import express from "express";

import cors from "cors";
import path from "path";

import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/user.js"

import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";


// loads the .env file
dotenv.config();

// console.log(process.env.MONGO_URI);


// create server and the port number the server is listening on
const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use(express.json()); // parse JSON bodies: req.body

app.use(rateLimiter); // limit the number of request


// logs incoming request from 
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});





// Mount the routes under the /api/ endpoint
app.use("/api/sessions", sessionRoutes);
app.use("/api/user", userRoutes);




// first connect to the DB
// Start the server and listen for incoming requests
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});