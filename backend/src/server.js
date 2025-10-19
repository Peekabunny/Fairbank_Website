// Import the Express framework for creating the server
import express from "express";

import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use(express.json()); // parse JSON bodies: req.body

app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});





// Mount the notes routes under the /api/notes endpoint
app.use("/api/notes", notesRoutes);



// first connect to the DB
// Start the server and listen for incoming requests
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});