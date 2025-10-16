import express from "express"

const router = express.Router();

router.get("")

router.get("/", (req, res) => {
  res.statue(200).send("You just fetched the notes");
});

router.post("/", (req, res) => {
  res.statue(201).send("Note created sucessfully");
});

router.put("/", (req, res) => {
  res.statue(200).send("Note updated sucessfully!");
});

router.delete("/", (req, res) => {
  res.statue(200).send("Note deleted sucessfully");
});



export default router