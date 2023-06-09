import axios from "axios";

import { post, get, put } from "./types";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3106/api";

const axi = {
  post: {
    async authorization(data: post["authorization"]["req"]) {
      return axios.post("/authorization", data);
    },
    async registration(data: post["registration"]["req"]) {
      return axios.post("/registration", data);
    },
  },
  get: {
    async itsMe() {
      return axios
        .get<get["itsMe"]["res"]>("/itsMe", {
          withCredentials: true,
        })
        .then((res) => res.data);
    },
    async user(id?: number) {
      return axios
        .get<get["user"]["res"]>("/user", {
          params: { id },
        })
        .then((res) => res.data);
    },
    async users() {
      return axios.get<get["user"]["res"][]>("/users").then((res) => res.data);
    },
    async chats() {
      return axios.get<get["chats"]["res"][]>("/chats").then((res) => res.data);
    },
    async messages(data: get["messages"]["req"]) {
      return axios
        .get<get["messages"]["res"][]>("/messages", {
          params: data,
        })
        .then((res) => res.data);
    },
  },
  put: {
    async user(data: put["user"]) {
      return axios.put("/user", data);
    },
  },
};

export default axi;
