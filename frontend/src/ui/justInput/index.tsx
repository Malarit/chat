import React from "react";

import style from "./index.module.scss";

type justInput = {
  name?: string;
  type?: React.HTMLInputTypeAttribute | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const JustInput: React.FC<justInput> = (props) => {
  const { onChange, type, value, name } = props;
  return (
    <input
      name={name}
      type={type}
      value={value}
      className={style.root}
      onChange={onChange}
    />
  );
};

export default JustInput;
