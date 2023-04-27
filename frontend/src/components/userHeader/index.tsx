import React from "react";

import Button from "../../ui/button";

import style from "./index.module.scss";

type onClickBtn = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;

type userHeader = {
  data: {
    avatar: string;
    poster: string;
    userName: string;
    city: string;
  };
  btnTextLeft: string;
  btnTextRight: string;
  onClickLeft: onClickBtn;
  onClickRight: onClickBtn;
  className?: string;
};

const UserHeader: React.FC<userHeader> = (props) => {
  const {
    data,
    btnTextLeft,
    btnTextRight,
    onClickLeft,
    onClickRight,
    className,
  } = props;

  const { avatar, poster, userName, city } = data;

  return (
    <div className={style.root}>
      <img
        className={style.poster}
        src={poster}
        alt="poster"
        onDragStart={(e) => e.preventDefault()}
      />
      <div className={style.body}>
        <div className={style.avatar}>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
        </div>
        <div className={style.userInfo}>
          <div className={style.userName}>{userName}</div>
          <div>
            <span>{city}</span>
          </div>
        </div>
        <div className={style.buttons}>
          <div>
            <Button text={btnTextLeft} enableButton onClick={onClickLeft} />
          </div>
          <div>
            <Button text={btnTextRight} enableButton onClick={onClickRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
