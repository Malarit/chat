import React from "react";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { useSearchParams } from "react-router-dom";

import { listObj } from "../../ui/list/types";
import { screens } from "../../redux/slices/screen/types";

import Menu from "../../components/menu";

import { selectActiveScreen } from "./../../redux/slices/screen/selectors";
import { selectUserId } from "./../../redux/slices/account/selectors";
import { setActiveScreen } from "../../redux/slices/screen/slice";

import GetText from "./../../hooks/getText";
import screensUrlParams, { iurls } from "../../hooks/useScreensUrlParams";

import iam from "../../assets/icons/iam.svg";

type menuContainer = {
  className?: string;
  ulClassName?: string;
  liClassName?: string;
};

const MenuContainer: React.FC<menuContainer> = (props) => {
  const lang = GetText().Home;
  const dispatch = useAppDispatch();
  const activeScreen = useAppSelector(selectActiveScreen);
  const userId = useAppSelector(selectUserId);
  const { setScreenParams } = screensUrlParams();

  const screenOptions: iurls = {
    MyPage: {
      user: userId?.toString() ?? "",
    },
    Friends: {},
    Messages: {},
    Music: {},
    News: {},
    Settings: {},
    Streams: {},
  };

  const list: listObj<screens>[] = [
    {
      text: lang.MyPage,
      img: iam,
      clickValue: "MyPage",
    },
    {
      text: lang.News,
      img: iam,
      clickValue: "News",
    },
    {
      text: lang.Messages,
      img: iam,
      clickValue: "Messages",
    },
    {
      text: lang.Friends,
      img: iam,
      clickValue: "Friends",
    },
    {
      text: lang.Streams,
      img: iam,
      clickValue: "Streams",
    },
    {
      text: lang.Music,
      img: iam,
      clickValue: "Music",
    },
  ];

  function onClickLi(e: any, clickValue: screens) {
    setScreenParams(clickValue, screenOptions[clickValue]);
    dispatch(setActiveScreen(clickValue));
  }

  return (
    <Menu
      list={list}
      clickValueActive={activeScreen}
      onClickLi={onClickLi}
      {...props}
    />
  );
};

export default MenuContainer;
