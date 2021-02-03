import jwt from "jwt-simple";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user";
import sendMail from "../externalServices/mailer";
import dotenv from "dotenv";
dotenv.config();

const userLogin = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { email } = req.body;
    const passwordEntered = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ Error: "Invalid email or password" });
    }

    const { password, _id, fullName, isVerified } = user;

    // if (!isVerified) {
    //   const random = Math.floor(100000 + Math.random() * 900000);
    //   const heading = "EMAIL VERIFICATION";
    //   const content = `Your one time password is ${random}. Kindly type in this OTP to complete your registration.\nThank you!`;

    //   const secret = `${fullName}-${password}`;

    //   const token = jwt.encode(
    //     {
    //       random,
    //       email,
    //     },
    //     secret
    //   );

    //   sendMail(heading, content, email);

    //   return res.status(400).json({
    //     Message: "Verify your email! An OTP has just been sent to your mail",
    //     isVerified
    //   });
    // }

    const isPasswordValid = await bcrypt.compare(passwordEntered, password);

    if (!isPasswordValid) {
      return res.status(400).json({ Error: "Invalid email or password" });
    }

    const token = jwt.encode({ _id }, `${process.env.JWT_SECRET}`);

    return res
      .status(200)
      .json({ Message: "Login successful!", _id, fullName, token });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export default userLogin;
