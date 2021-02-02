import express from "express";
import signUp from "../controllers/userSignup";


const router = express.Router();

router.post("/signup", signUp);


export default router;