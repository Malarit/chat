import React from "react";
import cn from "classnames";

import style from "./index.module.scss";
import { list, listObj, array, get_value } from "./types";

const isStringArray = (array: any[]) => {
  for (let item of array) {
    if (typeof item !== "string") return false;
  }
  return true;
};

const getValue: get_value = (
  list,
  className,
  onClick,
  liActiveClassName,
  clickValueActive
) => {
  if (!list) return "";

  const arrayIs = isStringArray(list);

  if (arrayIs) {
    const stringList = list as string[];

    const jsx = stringList.map((item, key) => (
      <li
        key={key}
        className={cn(className, {
          [liActiveClassName as string]: key === clickValueActive,
        })}
        onClick={(e) => onClick?.(e)}
      >
        {item}
      </li>
    ));

    return jsx;
  } else {
    const objList = list as listObj[];

    const jsx = objList.map((item, key) => (
      <li
        key={key}
        className={cn(className, {
          [liActiveClassName as string]: item?.clickValue === clickValueActive,
        })}
        onClick={(e) =>
          onClick?.(e, item?.clickValue as typeof item.clickValue)
        }
      >
        <img src={item.img} alt=":\" />
        {item.text}
      </li>
    ));

    return jsx;
  }
};

const List: React.FC<list> = (props) => {
  const {
    ulClassName,
    liClassName,
    list,
    onClickLi,
    clickValueActive,
    liActiveClassName,
  } = props;

  return (
    <ul className={cn(style.root, ulClassName)}>
      {getValue(
        list,
        liClassName,
        onClickLi,
        liActiveClassName,
        clickValueActive
      )}
    </ul>
  );
};

export default List;
