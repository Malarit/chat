import React from "react";

import cn from "classnames";

import style from "./index.module.scss";

type button = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  enableButton?: boolean;
};
const Button: React.FC<button> = (props) => {
  const { onClick, enableButton, text } = props;

  return (
    <div className={style.root}>
      <input
        type="button"
        value={text}
        onClick={(e) => enableButton && onClick?.(e)}
        className={cn({ [style.enableButton]: enableButton })}
      />
    </div>
  );
};

export default Button;
