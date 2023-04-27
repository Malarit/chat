import React from "react";
import cn from "classnames";

import arrow from "./arrowSvg";

import style from "./index.module.scss";

type buttonsArrow = {
  onClick: (
    side: "left" | "right",
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  activeButtons: { left: boolean; right: boolean };
};

const buttonsArrow: React.FC<buttonsArrow> = (props) => {
  const { onClick, activeButtons } = props;
  return (
    <div className={style.buttons}>
      <button
        onClick={(e) => onClick?.("left", e)}
        className={cn({ [style.active]: activeButtons?.left })}
      >
        {arrow}
      </button>
      <button
        onClick={(e) => onClick?.("right", e)}
        className={cn({ [style.active]: activeButtons?.right })}
      >
        {arrow}
      </button>
    </div>
  );
};
