import React from "react";
import cn from "classnames";

import Button from "../../ui/button";

import style from "./index.module.scss";

type posterPreview = {
  textButton: string;
  poster: string;
  refFileInput?: any;
  headerText?: string;
  active?: boolean;
  onChangeFileInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickButton?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const PosterPreview: React.FC<posterPreview> = (props) => {
  const {
    onMouseEnter,
    onMouseLeave,
    textButton,
    active,
    poster,
    onClickButton,
    refFileInput,
    onChangeFileInput,
    headerText,
  } = props;

  return (
    <div
      className={style.root}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3>{headerText}</h3>
      <div className={cn(style.poster, { [style.active]: active })}>
        <div>
          <img src={poster} alt="poster" />
          {active && (
            <Button enableButton text={textButton} onClick={onClickButton} />
          )}
        </div>
        <div>
          <img src={poster} alt="poster" />
        </div>
      </div>
      <input
        id={style.file}
        type="file"
        ref={refFileInput}
        onChange={onChangeFileInput}
      />
    </div>
  );
};

export default PosterPreview;
