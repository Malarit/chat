import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { selectLanguage } from "../redux/slices/account/selectors";
import { selectSideUsersId } from "./../redux/slices/chats/selectors";
import { removeOnlineUser, setOnlineUsers } from "../redux/slices/chats/slice";
import { fetchItsMe, setLanguage } from "../redux/slices/account/slice";
import { selectUserId } from "./../redux/slices/account/selectors";

import { customMatch } from "../services/regex";
import socket from "./../services/socket/index";
import ACTIONS from "../services/socket/action";

import Ui from "./../pages/ui/index";

import style from "./app.module.scss";

const Home = React.lazy(() => import("../pages/home"));
const Login = React.lazy(() => import("../pages/login"));

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const userId = useAppSelector(selectUserId);
  const chatUser = useAppSelector(selectSideUsersId);

  const getUserId = () => {
    dispatch(fetchItsMe())
      .unwrap()
      .then()
      .catch(() => navigate("/login"));
  };

  React.useEffect(() => {
    getUserId();
    const timer = setInterval(() => {
      getUserId();
    }, 1000 * 1800); // 30 min
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (!userId) return;
    socket.emit(ACTIONS.USER.ONLINE, userId);
    socket.on(ACTIONS.USER.ONLINE, (userId) => {
      if (chatUser.includes(userId)) {
        dispatch(setOnlineUsers(userId));
      }
    });
    socket.on(ACTIONS.USER.OFFLINE, (userId) => {
      if (chatUser.includes(userId)) {
        dispatch(removeOnlineUser(userId));
      }
    });
  }, [userId]);

  React.useEffect(() => {
    const lang = customMatch(navigator.language, "langRemoveRegion");
    if (!language) dispatch(setLanguage(lang));
  }, []);

  return (
    <div className={style.root}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui" element={<Ui />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
