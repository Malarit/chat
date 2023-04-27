// Rewrite on relative values
import React from "react";
import style from "./index.module.scss";

export type input = {
  label: string;
  name: string;
  typeInput?: React.HTMLInputTypeAttribute;
  invalid?: boolean;
  value?: string;
  onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outline_Color?: string;
  invalid_Color?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  classNameInput?: string;
};

const LINE_HEIGHT: number = 2;
const DEFAULT_OUTLINE_COLOR = "rgb(255, 0, 212)";
const DEFAULT_INVALID_COLOR = "red";

const Input: React.FC<input> = (props) => {
  const {
    label,
    name,
    typeInput,
    invalid,
    onChangeEvent,
    value,
    outline_Color,
    invalid_Color,
    onFocus,
    onBlur,
  } = props;

  const outlineColor: string = outline_Color ?? DEFAULT_OUTLINE_COLOR;
  const invalidColor: string = invalid_Color ?? DEFAULT_INVALID_COLOR;

  const refLabel = React.useRef<HTMLLabelElement>(null);
  const refInput = React.useRef<HTMLInputElement>(null);
  const [inputValue, setinputValue] = React.useState<string>("");
  const [outlineActive, setOutlineActive] = React.useState<boolean>(
    inputValue != ""
  );

  React.useEffect(() => {
    if (value) {
      setinputValue(value);
      setOutlineActive(value != "");
    }
  }, []);

  const getStyleLabel = () => {
    const inputHeight = refInput.current?.offsetHeight ?? 0;
    const lineColor = invalid ? invalidColor : outlineColor;

    const transform = `translate(0px, ${
      outlineActive ? -inputHeight / 2 : 0
    }px)`;
    const color = outlineActive ? lineColor : "";

    return {
      transform,
      color,
    };
  };

  const getStyleLine = () => {
    const labelWidth = refLabel.current?.offsetWidth;
    const inputTop = refInput.current?.offsetTop ?? 0;

    const width = outlineActive ? labelWidth : 0;
    const top = inputTop - LINE_HEIGHT / 2;

    return {
      width,
      top,
    };
  };

  const getStyleInput = () => {
    const _outlineColor = `1px solid ${invalid ? invalidColor : outlineColor}`;

    const outline = outlineActive ? _outlineColor : ``;

    return {
      outline,
    };
  };

  return (
    <div className={style.root}>
      <label htmlFor={name} ref={refLabel} style={getStyleLabel()}>
        {label}
      </label>
      <div className={style.line} style={getStyleLine()}></div>
      <input
        id={name}
        type={typeInput || "text"}
        name={name}
        value={inputValue}
        style={getStyleInput()}
        onFocus={(e) => {
          setOutlineActive(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setOutlineActive(inputValue != "");
          onBlur?.(e);
        }}
        onChange={(e) => {
          setinputValue(e.target.value);
          onChangeEvent?.(e);
        }}
        ref={refInput}
      />
    </div>
  );
};

export default Input;
