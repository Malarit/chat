import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

export type info = {
  ulHeader: string;
  textLi?: string[];
  className?: string;
};

const Info: React.FC<info> = (props) => {
  const { ulHeader, textLi, className } = props;

  return (
    <ul className={cn(style.root, className)}>
      {ulHeader}
      {textLi?.map((text, key) => (
        <li key={key}>{text}</li>
      ))}
    </ul>
  );
};

export default Info;
