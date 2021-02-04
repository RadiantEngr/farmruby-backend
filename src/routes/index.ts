import express from "express";
import signUp from "../controllers/userSignup";
import verifyUser from "../controllers/verifyUser";
import userLogin from "../controllers/userLogin";
import protectedEndpoint from "../controllers/protected";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/signup", signUp);

router.put("/verifyuser/:email", verifyUser);

router.post("/userlogin", userLogin);

router.post("/protected/:id", auth, protectedEndpoint);


export default router;