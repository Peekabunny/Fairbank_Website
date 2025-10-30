import express from "express"
//controller functions
import {loginUser, signUpUser} from "../controllers/userControllers.js";


const router = express.Router()

// login route
router.post("/login", loginUser);

// signup route

router.post("/signup", signUpUser);

export default router