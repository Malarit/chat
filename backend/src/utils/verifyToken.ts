import { Request, Response } from "express";

import { config } from "../config/config.js";
import { bdFindOne } from "../db/query.js";
import { User } from "../models/models.js";
import { jwtVerify } from "./jwt.js";

const verifyToken = async (req: Request<any, any, any, any, any>, res: Response) => {
  try {
    const token: string = req.cookies[config.jwt.ACCESS_TOKEN_NAME];

    if (!token) {
      res.status(403).json("Couldn't find token");
      return;
    }

    const user = await bdFindOne(User, {
      attributes: ["id"],
      where: {
        id: jwtVerify(token).data,
      },
    });

    if (!user) {
      res.status(404).json("Couldn't find the user ");
      return;
    }

    return user.id;
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
};

export default verifyToken;
