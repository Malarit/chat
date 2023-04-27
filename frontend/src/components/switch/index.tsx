import React from "react";
import cn from "classnames";

import { switchType } from "./types";

import style from "./index.module.scss";

const Switch: React.FC<switchType> = (props) => {
  const { component, className } = props;

  return <div className={cn(style.root, className)}>{component}</div>;
};

export default Switch;
