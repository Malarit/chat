import React from "react";
import { Link } from "react-router-dom";

import PopupList from "../../ui/popupList";
import List from "../../ui/list";

import musicSvg27x27 from "../../assets/icons/music27x27.svg";
import userImg from "../../assets/img/user.png";

import style from "./index.module.scss";

type header = {
  onClickUser: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  popapValue: { text: string; img: string }[];
  popapOpen: boolean;
  onClickPopapLi: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: any
  ) => void;
  refButton?: React.RefObject<HTMLButtonElement>;
};

const Header: React.FC<header> = (props) => {
  const { onClickUser, popapOpen, popapValue, refButton, onClickPopapLi } =
    props;

  return (
    <div className={style.root}>
      <div className={style.container}>
        <a href="" className={style.logo}>
          ЛОГОТИП
        </a>
        <div className={style.rightBlock}>
          <div className={style.icons}>
            <Link to={""}>
              <img src={musicSvg27x27} alt="music" />
            </Link>
          </div>
          <div className={style.user}>
            <button onClick={(e) => onClickUser(e)} ref={refButton}>
              <img src={userImg} alt="" />
              <span>userName</span>
              <span>{">"}</span>
            </button>
            <PopupList
              value={
                <List
                  list={popapValue}
                  liClassName={style.list}
                  onClickLi={onClickPopapLi}
                />
              }
              open={popapOpen}
              className={style.popap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
