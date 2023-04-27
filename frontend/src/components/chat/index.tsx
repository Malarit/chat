import React from "react";
import cn from "classnames";

import { chat } from "./type";

import ChatInput from "./../../ui/chatInput/index";
import ChatСloud from "../../ui/chatСloud";

import SendSvg from "./sendSvg";

import style from "./index.module.scss";

const Chat: React.FC<chat> = (props) => {
  const {
    sendActive,
    messages,
    firstName,
    secondName, 
    status,
    onClickSend,
    getRefInput,
    refBody,
  } = props;

  return (
    <div className={style.root}>
      <div className={style.header}>
        <div>{firstName + " " + secondName}</div>
        <div>{status}</div>
      </div>
      <div ref={refBody} className={style.body}>
        {messages.map((item, key) => (
          <ChatСloud key={key} {...item} />
        ))}
      </div>
      <div className={style.footer}>
        <ChatInput className={style.input} getRef={getRefInput} />
        <button
          onClick={onClickSend}
          className={cn({ [style.active]: sendActive })}
        >
          <SendSvg />
        </button>
      </div>
    </div>
  );
};

export default Chat;
