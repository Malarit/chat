import React from "react";
import cn from "classnames";

import { login } from "./types";

import Input from "../../ui/input";
import Button from "../../ui/button";
import Info from "../../ui/info";

import style from "./index.module.scss";

const Login: React.FC<login> = (props) => {
  const {
    arrInput,
    onChangeEvent,
    outline_Color,
    invalid_Color,
    className,
    onClickButton,
    textButton,
    enableButton,
    headerText,
    onBlur,
  } = props;

  const colors = { outline_Color, invalid_Color };

  const getButton = () => {
    return (
      <div className={style.button}>
        <Button
          text={textButton ?? ""}
          onClick={onClickButton}
          enableButton={enableButton}
        />
      </div>
    );
  };

  const getInputs = () => {
    return arrInput.map((obj, key) => (
      <div key={key} className={style.input}>
        <Input
          {...obj}
          {...colors}
          invalid={obj.invalid}
          onChangeEvent={onChangeEvent}
          onBlur={onBlur}
        />
        {obj.invalid && obj.info && (
          <div className={style.info}>
            <Info {...obj.info} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={cn(style.root, className)}>
      <div className={style.header}>{headerText}</div>
      {getInputs()}
      {textButton && getButton()}
    </div>
  );
};

export default Login;
