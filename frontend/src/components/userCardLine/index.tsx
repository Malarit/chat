import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type userCardLine = {
  userName: string;
  userText: string;
  avatar: string;
  data?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
};

const UserCardLine: React.FC<userCardLine> = (props) => {
  const { onClick, className, userName, userText, avatar, data } = props;

  return (
    <div className={cn(style.root, className)} onClick={onClick}>
      <img src={avatar} alt="" />
      <div>
        <div>{userName}</div>
        <div>{userText}</div>
      </div>
      <span>{data}</span>
    </div>
  );
};

export default UserCardLine;
