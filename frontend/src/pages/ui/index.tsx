import React from "react";

import style from "./index.module.scss";

import JustInput from "../../ui/justInput";
import ChatInput from "../../ui/chatInput";

const Ui: React.FC = () => {
  const [active, setActive] = React.useState("asd");

  return (
    <div className={style.root}>
      <ChatInput />
    </div>
  );
};

export default Ui;
