import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type buttonLogin = {
  text: string;
  onCLick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

const ButtonLogin: React.FC<buttonLogin> = (props) => {
  const { text, onCLick, className } = props;

  return (
    <button className={cn(style.root, className)} onClick={onCLick}>
      {text}
    </button>
  );
};

export default ButtonLogin;
