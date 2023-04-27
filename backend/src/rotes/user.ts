import { Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  reqAuth,
  reqMessagePost,
  reqReg,
  reqUserGet,
  reqUserPut,
} from "./type.js";

import { Chat, User, ChatMessages } from "../models/models.js";
import { getHash, verifieHash } from "../utils/hashedPassword.js";
import { config, cookie } from "../config/config.js";
import { jwtSign, jwtVerify } from "../utils/jwt.js";
import { bdFindOne } from "../db/query.js";

import verifyToken from "../utils/verifyToken.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/itsMe", async (req, res) => {
  const id = await verifyToken(req, res);
  if (id) res.status(200).json({ id });
});

router.post("/authorization", async (req: reqAuth, res) => {
  try {
    const { email, password } = req.body;

    const user = await bdFindOne(User, {
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json("Couldn't find the user ");
      return;
    }

    const verifie = await verifieHash(password, user.password);

    if (verifie) {
      const token = jwtSign(user?.id);
      res
        .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
        .status(200)
        .json("cookie set");
    } else {
      res.status(400).json("Failed verifie password");
    }
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

router.post("/registration", async (req: reqReg, res) => {
  try {
    const { userName, password, email } = req.body;

    const hashPassword = await getHash(password);

    await User.build({
      userName,
      email,
      password: hashPassword,
    }).save();

    const user = await bdFindOne(User, {
      where: {
        userName: userName,
      },
    });

    const token = jwtSign(user?.id);

    res
      .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
      .status(200)
      .json("cookie set");
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

router.get("/user", async (req: reqUserGet, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(404).json("Not found");
    return;
  }

  const user = await bdFindOne(User, {
    attributes: { exclude: ["password", "email", "updatedAt"] },
    where: {
      id,
    },
  });

  if (!user) res.status(404).json("Not found");

  res.status(200).json(user);
});

router.put(
  "/user",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  async (req: reqUserPut, res: Response) => {
    const id = await verifyToken(req, res);
    if (!id) return;

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const poster = files?.poster?.[0].path;
    const avatar = files?.avatar?.[0].path;

    const data = await User.findOne({
      where: {
        id,
      },
    });

    data?.set({
      ...req.body,
      poster: poster,
      avatar: avatar,
    });

    await data?.save();

    res.status(200).json("Ok");
  }
);

router.get("/message", async (req: reqMessagePost, res) => {

})

router.post("/message", async (req: reqMessagePost, res) => {
  const { firstUser, secondUser, text, time } = req.body;

  try {
    const getChat = async () => {
      return bdFindOne(Chat, {
        attributes: ["id"],
        where: {
          firstUser,
          secondUser,
        },
      });
    };

    let chat = await getChat();
    if (!chat) {
      await Chat.build({ firstUser, secondUser }).save();
    }

    chat = await getChat();

    ChatMessages.build({
      chat_id: chat.id,
      text,
      time,
    }).save();

    res.status(200).json("Ok");
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

export default router;
