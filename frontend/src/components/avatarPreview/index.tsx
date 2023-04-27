import React from "react";
import Button from "../../ui/button";

import style from "./index.module.scss";

type avatarPreview = {
  avatar: string;
  buttonText: string;
  headerText?: string;
  onClickButton?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChangeInputFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refInputFile?: any;
};

const AvatarPreview: React.FC<avatarPreview> = (props) => {
  const {
    avatar,
    headerText,
    buttonText,
    onClickButton,
    onChangeInputFile,
    refInputFile,
  } = props;

  return (
    <div className={style.root}>
      <h3>{headerText}</h3>
      <div>
        <div>
          <img src={avatar} alt="avatar" />
          <img src={avatar} alt="avatar" />
          <img src={avatar} alt="avatar" />
        </div>
        <Button onClick={onClickButton} text={buttonText} enableButton />
      </div>
      <input
        id={style.file}
        type="file"
        ref={refInputFile}
        onChange={onChangeInputFile}
      />
    </div>
  );
};

export default AvatarPreview;
