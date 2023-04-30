import { ModelDefined, Optional } from "sequelize";

export type nodeAttributes<T, key extends keyof T> = Optional<T, key>;

interface user {
  id: number;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  description: string;
  poster: string;
  avatar: string;
}
export type user_model = ModelDefined<
  user,
  nodeAttributes<
    user,
    "id" | "firstName" | "secondName" | "description" | "poster" | "avatar"
  >
>;

interface chat {
  id: string;
  firstUser: number;
  secondUser: number;
}
export type chat_model = ModelDefined<chat, nodeAttributes<chat, "id">>;

interface chatMessages {
  id: number;
  chat_id: string;
  text: string;
  time: string;
}
export type chatMessages_model = ModelDefined<
  chatMessages,
  nodeAttributes<chatMessages, "id">
>;
