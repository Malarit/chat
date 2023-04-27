import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type obliqueBlock = {
  element: JSX.Element;
  className?: string;
};

const ObliqueBlock: React.FC<obliqueBlock> = (props) => {
  const { element, className } = props;

  return (
    <div className={cn(style.root, className)}>
      <div className={style.line}></div>
      <div className={style.wrapper}>{element}</div>
    </div>
  );
};

export default ObliqueBlock;
