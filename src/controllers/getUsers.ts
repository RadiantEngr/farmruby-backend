import { User } from "../models/user";
import { Request, Response } from "express";

const findUsers = async (req: Request, res: Response) => {
    try {

        const users = await User.find();

        if (!users) {
            return res.status(404).json({ Message: "No data found" });
        }

        res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

const findUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ Message: "No data found" });
        }

        res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ Erroe: err.message });
    }
}

export { findUsers, findUser };