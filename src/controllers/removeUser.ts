import { User } from "../models/user";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .json({ Error: "The user you are trying to delete does not exist" });
        }

        const data = await User.findByIdAndDelete(id);

        return res.status(400).json({Message: "This user has been deleted" ,data });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
};

export default deleteUser;