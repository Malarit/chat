import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type block = {
  element: JSX.Element;
  className?: string;
  disablePadding?: boolean;
};

const Block: React.FC<block> = ({ element, className, disablePadding }) => {
  return (
    <div
      className={cn(style.root, className, {
        [style.padding]: !disablePadding,
      })}
    >
      {element}
    </div>
  );
};

export default Block;
