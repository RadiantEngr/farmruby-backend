import express from "express";
import signUp from "../controllers/userSignup";
import verifyUser from "../controllers/verifyUser";
import userLogin from "../controllers/userLogin";
import protectedEndpoint from "../controllers/protected";
import auth from "../middleware/auth";
import { findUsers, findUser } from "../controllers/getUsers";
import deleteUser from "../controllers/removeUser";
import { requestPasswordReset, changePassword } from "../controllers/passwordReset";

const router = express.Router();

router.post("/signup", signUp);

router.put("/verifyuser/:email", verifyUser);

router.post("/userlogin", userLogin);

router.post("/protected/:id", auth, protectedEndpoint);

router.get("/findusers", findUsers);

router.get("/finduser/:id", findUser);

router.delete("/deleteuser/:id", deleteUser);

router.post("/passwordreset", requestPasswordReset);

router.put("/passwordreset/:token", changePassword);

export default router;