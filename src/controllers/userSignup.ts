const { User, validateUser } = require("../models/user");
import { Request, Response } from "express";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";
import sendMail from "../externalServices/mailer";

const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { error, value } = validateUser(req.body);
    console.log({Error: error});
    
    console.log({Value: value});
    
    if (error) {
      throw Error(error.details[0].message);
    }

    const { fullName, email, password } = value;
    console.log({Value: value})
      if (fullName.split(" ").length < 2) {
          return res.status(400).json({Error: "Please enter your first and last names"})
      }

    const random = Math.floor(100000 + Math.random() * 900000);
    const heading = "EMAIL VERIFICATION";
    const content = `Your one time password is ${random}. Kindly type in this OTP to complete your registration.\nThank you!`;

    const payload = {
      random,
      email,
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const secret = `${fullName}-${hashedPassword}`;
    const token = jwt.encode(payload, secret);

      const user = await User.findOne({ email });      
      if (user) {
        
      if (!user.isVerified) {
        sendMail(heading, content, email);
        await User.findOneAndUpdate(
          { email },
          {
            $set: {
              token,
            },
          }
        );

        return res.status(200).json({
          Message:
            "An OTP has been sent to your email address. Kindly enter the code to verify your email and complete your registration.",
        });
      }

      return res.status(400).json({ Error: "You are already signed up" });
    }

    sendMail(heading, content, email);
    value.password = hashedPassword;
    value.token = token;
    const newUser = new User(value);
    await newUser.save();

    res.status(200).json({
      Message:
        "An OTP has been sent to your email address. Kindly enter the code to verify your email and complete your registration.",
    });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

export default signUp;
