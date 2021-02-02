import Joi from "joi";
import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
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
      minlength: 8,
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
  })
);

const validateUser = (user: any) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isVerified: Joi.boolean(),
    token: Joi.string(),
  });

  return schema.validate(user);
};

export { User, validateUser };
