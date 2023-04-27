import React from "react";
import cn from "classnames";

import { splitScreen } from "./types";

import style from "./index.module.scss";

const SplitScreen: React.FC<splitScreen> = (props) => {
  const { classNameRoot, aside, body } = props;

  return (
    <div className={cn(style.root, classNameRoot)}>
      <div className={style.aside}>{aside}</div>
      <div className={style.body}>{body}</div>
    </div>
  );
};

export default SplitScreen;
