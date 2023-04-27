import React from "react";
import cn from "classnames";

import JustInput from "../../ui/justInput";

import { listInput } from "./types";

import style from "./index.module.scss";

const ListInput: React.FC<listInput> = (props) => {
  const { list, onChange, header, classNameRoot, classNameLi } = props;

  return (
    <ul className={cn(style.root, classNameRoot)}>
      <h3>{header}</h3>
      {list.map((item, key) => (
        <li key={key} className={classNameLi}>
          {item.label}
          <div className={style.element}>
            {item.element ?? <JustInput {...item} onChange={onChange} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListInput;
