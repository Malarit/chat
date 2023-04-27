import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { selectLanguage } from "../redux/slices/account/selectors";
import { fetchItsMe, setLanguage } from "../redux/slices/account/slice";

import { customMatch } from "../services/regex";

import Ui from "./../pages/ui/index";

import style from "./app.module.scss";

const Home = React.lazy(() => import("../pages/home"));
const Login = React.lazy(() => import("../pages/login"));

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const getUserId = () => {
    dispatch(fetchItsMe())
      .unwrap()
      .then()
      .catch(() => navigate("/login"));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      getUserId();
    }, 1000 * 1800); // 30 min
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    getUserId();
  }, []);

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
