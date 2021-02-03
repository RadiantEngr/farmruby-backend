"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userSignup_1 = __importDefault(require("../controllers/userSignup"));
var verifyUser_1 = __importDefault(require("../controllers/verifyUser"));
var userLogin_1 = __importDefault(require("../controllers/userLogin"));
var getUsers_1 = require("../controllers/getUsers");
var removeUser_1 = __importDefault(require("../controllers/removeUser"));
var router = express_1.default.Router();
router.post("/signup", userSignup_1.default);
router.put("/verifyuser/:email", verifyUser_1.default);
router.post("/userlogin", userLogin_1.default);
router.get("/findusers", getUsers_1.findUsers);
router.get("/finduser/:id", getUsers_1.findUser);
router.delete("/deleteuser/:id", removeUser_1.default);
exports.default = router;
