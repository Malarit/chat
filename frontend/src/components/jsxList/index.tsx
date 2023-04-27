import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type jsxList = {
  elements: JSX.Element[];
  className?: string;
  classNameWrapper?: string;
};

const JsxList: React.FC<jsxList> = (props) => {
  const { elements, className, classNameWrapper } = props;

  return (
    <div className={cn(style.root, className)}>
      {elements.map((item, key) => (
        <div key={key} className={classNameWrapper}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default JsxList;
