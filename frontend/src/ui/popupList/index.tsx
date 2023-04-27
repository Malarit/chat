import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type popupList = {
  value: JSX.Element | JSX.Element[];
  className?: string;
  open?: boolean;
};

const getValue = (value: JSX.Element | JSX.Element[]) => {
  if (!value) return "";

  if (Array.isArray(value)) return <ul>{...value}</ul>;

  return value;
};

const PopupList: React.FC<popupList> = (props) => {
  const { value, className, open } = props;
  
  return (
    <div className={cn(style.popup, { [style.active]: open }, className)}>
      {getValue(value)}
    </div>
  );
};

export default PopupList;
