import React from "react";

import Block from "../../components/block";
import SplitScreen from "../../components/splitScreen";
import ChatContainer from "../../containers/messages/chat.container";

import ListUserCardLineContainer from "./../../containers/messages/listUserCardLine.container";

import style from "./index.module.scss";

const Messages: React.FC = () => {
  return (
    <div className={style.root}>
      <Block
        disablePadding
        element={
          <SplitScreen
            aside={<ListUserCardLineContainer className={style.userCard} />}
            body={<ChatContainer />}
            classNameRoot={style.splitScreen}
          />
        }
      />
    </div>
  );
};

export default Messages;
