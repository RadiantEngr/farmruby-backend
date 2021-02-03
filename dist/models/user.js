"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
}));
exports.User = User;
var validateUser = function (user) {
    var schema = joi_1.default.object({
        fullName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(4).required(),
        isVerified: joi_1.default.boolean(),
        token: joi_1.default.string(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
