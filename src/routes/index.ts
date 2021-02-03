import express from "express";
import signUp from "../controllers/userSignup";
import verifyUser from "../controllers/verifyUser";
import userLogin from "../controllers/userLogin";
import { findUsers, findUser } from "../controllers/getUsers";
import deleteUser from "../controllers/removeUser";

const router = express.Router();

router.post("/signup", signUp);

router.put("/verifyuser/:email", verifyUser);

router.post("/userlogin", userLogin);

router.get("/findusers", findUsers);

router.get("/finduser/:id", findUser);

router.delete("/deleteuser/:id", deleteUser);

export default router;