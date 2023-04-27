import Sequelize, { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/index.js";

import * as mt from "./types.js";

export const User: mt.user_model = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export const Chat: mt.chat_model = sequelize.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  secondUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Chat, {
  foreignKey: "firstUser",
});
User.hasMany(Chat, {
  foreignKey: "secondUser",
});

export const ChatMessages: mt.chatMessages_model = sequelize.define(
  "ChatMessages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

Chat.hasMany(ChatMessages, {
  foreignKey: "chat_id",
});
