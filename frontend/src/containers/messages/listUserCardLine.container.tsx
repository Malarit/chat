import React from "react";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";

import {
  fetchChats,
  setActiveChat,
  setOnlineUsers,
} from "./../../redux/slices/chats/slice";
import {
  selectChats,
  selectOnlineUsers,
} from "./../../redux/slices/chats/selectors";

import { setImgDomain } from "../../services/setImgDomain";

import UserCardLine from "../../components/userCardLine";

import avatar from "../../assets/img/avatar.jpg";
import socket from "./../../services/socket/index";
import ACTIONS from "../../services/socket/action";
import objToArray from "./../../../../backend/src/utils/objToArray";

const ListUserCardLineContainer: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectChats);
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const refFlag = React.useRef<boolean>(true);
  const refSecondFlag = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (refFlag.current) {
      dispatch(fetchChats());
    }
    refFlag.current = false;
  }, []);

  React.useEffect(() => {
    if (chats && refSecondFlag.current) {
      const usersId = objToArray(chats, "sideUserId") as number[];
      socket.emit(ACTIONS.USER.ISONLINE, usersId);
      socket.on(ACTIONS.USER.ISONLINE, (data: string) =>
        dispatch(setOnlineUsers(Number(data)))
      );

      refSecondFlag.current = false;
    }
  }, [chats]);

  return (
    <>
      {chats.map((chat, i) => (
        <UserCardLine
          key={i}
          data={onlineUsers.includes(chat.sideUserId) ? "online" : "offline"}
          className={className}
          avatar={setImgDomain(chat.avatar) || avatar}
          userName={chat.firstName + " " + chat.secondName}
          onClick={() => dispatch(setActiveChat(chat.chatId))}
          userText={chat.messages[chat.messages.length - 1].text}
        />
      ))}
    </>
  );
};

export default ListUserCardLineContainer;
