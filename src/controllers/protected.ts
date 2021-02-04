import { Request, Response } from "express";

const protectedEndpoint = (req: Request, res: Response) => {
    res.status(200).json({Message: "You are qualified to access this route"})
}

export default protectedEndpoint;