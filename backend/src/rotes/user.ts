import { Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import * as req from "./type.js";

import { Chat, User, ChatMessages } from "../models/models.js";
import { getHash, verifieHash } from "../utils/hashedPassword.js";
import { config, cookie } from "../config/config.js";
import { jwtSign, jwtVerify } from "../utils/jwt.js";
import { bdFindOne } from "../db/query.js";

import verifyToken from "../utils/verifyToken.js";
import { upload } from "../middleware/upload.js";
import { Op } from "sequelize";
import objToArray from "../utils/objToArray.js";

const router = Router();

router.get("/itsMe", async (req, res) => {
  const id = await verifyToken(req, res);
  if (id) res.status(200).json({ id });
});

router.post("/authorization", async (req: req.auth, res) => {
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

router.post("/registration", async (req: req.reg, res) => {
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

router.get("/user", async (req: req.userGet, res) => {
  const { id } = req.query;
  const excludeUser = ["password", "email", "updatedAt"];
  let user;

  if (!id) {
    res.status(404).json("Not found");
    return;
  }

  if (id) {
    user = await bdFindOne(User, {
      attributes: { exclude: excludeUser },
      where: {
        id,
      },
    });
  } else {
    user = await User.findAll({
      attributes: { exclude: excludeUser },
    });
  }

  if (!user) res.status(404).json("Not found");

  res.status(200).json(user);
});

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.put(
  "/user",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  async (req: req.userPut, res: Response) => {
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

router.get("/chats", async (req, res) => {
  const id = await verifyToken(req, res);
  if (!id) return;

  const chat = await Chat.findAll({
    where: {
      [Op.or]: [{ firstUser: id }, { secondUser: id }],
    },
    raw: true,
    nest: true,
  });

  if (!chat) {
    res.status(200).json([]);
    return;
  }

  let result = chat.map((item) => {
    const { firstUser, secondUser, ...chat } = item.get({ plain: true });
    return {
      ...chat,
      sideUserId: [firstUser, secondUser].filter((userId) => userId !== id)[0],
    };
  });

  const sideUsersId = objToArray(result, "sideUserId");

  const users = (
    await User.findAll({
      attributes: ["id", "firstName", "secondName"],
      where: {
        id: sideUsersId,
      },
    })
  ).map((item) => item.get({ plain: true }));

  result = result.map((item) => {
    const user = users.find((user) => user.id === item.sideUserId);
    return {
      ...item,
      firstName: user?.firstName,
      secondName: user?.secondName,
    };
  });

  res.status(200).json(chat);
});

router.get("/messages", async (req, res) => {
  res.status(200).json("");
});

router.post("/message", async (req: req.messagePost, res) => {
  const { sideUserId, chatId, text, time } = req.body;

  const id = await verifyToken(req, res);
  if (!id) return;

  try {
    const bdChatWhere = chatId ? { id: chatId } : undefined;
    let chat = await bdFindOne(Chat, {
      attributes: ["id"],
      where: bdChatWhere,
    });

    if (!chat && sideUserId) {
      Chat.build({
        firstUser: id,
        secondUser: sideUserId,
      });

      chat = await bdFindOne(Chat, {
        attributes: ["id"],
        where: {
          firstUser: id,
          secondUser: sideUserId,
        },
      });
    } else {
      res.status(400).json("sideUserId and chatId is undefined");
    }

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
