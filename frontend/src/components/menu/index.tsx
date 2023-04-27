import React from "react";
import cn from "classnames";

import { menu } from "./types";
import List from "../../ui/list";

import style from "./index.module.scss";

const Menu: React.FC<menu> = (props) => {
  const {
    list,
    className,
    ulClassName,
    liClassName,
    onClickLi,
    clickValueActive,
  } = props;

  return (
    <div className={cn(style.root, className)}>
      <List
        list={list}
        ulClassName={ulClassName}
        liClassName={liClassName}
        onClickLi={onClickLi}
        clickValueActive={clickValueActive}
        liActiveClassName={style.liActiveClassName}
      />
    </div>
  );
};

export default Menu;
