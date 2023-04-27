import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type input = {
  className?: string;
  onInput?: (e: React.FormEvent<HTMLDivElement>) => void;
  getRef?: (ref: React.RefObject<HTMLDivElement>) => void;
};

function setCaretNewLine(input: HTMLDivElement) {
  let range = document.createRange();
  let sel = window.getSelection();

  range.setStart(input.childNodes[input.childNodes.length - 1], 0);
  range.collapse(true);

  sel?.removeAllRanges();
  sel?.addRange(range);
}

function setCaretRight(input: HTMLDivElement) {
  let range = document.createRange();
  let sel = window.getSelection();

  range.setStart(
    input.childNodes[input.childNodes.length - 1],
    input.innerText.length
  );
  range.collapse(true);

  sel?.removeAllRanges();
  sel?.addRange(range);
}

const Input: React.FC<input> = (props) => {
  const { className, getRef } = props;

  const refInput = React.useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = refInput.current;
    if (!input) return;

    if (e.key == "Enter") {
      e.preventDefault();
    }

    if (e.shiftKey && e.key == "Enter") {
      input.innerHTML += "<br /><br />";
      setCaretNewLine(refInput.current);
    }
  };

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
  };

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!refInput.current) return;

    const text = e.clipboardData.getData("text/plain");
    refInput.current.innerText += text;
    setCaretRight(refInput.current);
  };

  React.useEffect(() => {
    if (!refInput.current) return;
    refInput.current.focus();
    getRef?.(refInput);
  }, [refInput.current]);

  return (
    <div
      ref={refInput}
      className={cn(style.root, className)}
      contentEditable={true}
      onKeyDown={onKeyDown}
      onInput={onInput}
      onPaste={onPaste}
    ></div>
  );
};

export default Input;
