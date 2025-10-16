import express from "express";
import notesRoutes from "./routes/notesRoutes.js"

const app = express();
const PORT = 5001;

app.use("/api/notes", notesRoutes);


app.use(express.json()); // this middleware will parse JSON bodies: req.body


app.listen(5001, () => {
  console.log("Server starting on Port: 5001");
});