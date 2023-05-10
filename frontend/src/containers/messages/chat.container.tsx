import React from "react";
import { useAppDispatch } from "./../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";

import {
  selectActiveChat,
  selectOnlineUsers,
} from "../../redux/slices/chats/selectors";
import { selectUserId } from "./../../redux/slices/account/selectors";
import { setMessage, updateChatId } from "../../redux/slices/chats/slice";
import { set_message, update_chat } from "../../redux/slices/chats/types";

import socket from "./../../services/socket/index";
import ACTIONS from "../../services/socket/action";

import Chat from "../../components/chat";

const ChatContainer: React.FC = () => {
  const refFlag = React.useRef<boolean>(true);
  const refInput = React.useRef<any>(null);
  const refBodyChat = React.useRef<HTMLDivElement>(null);
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const userId = useAppSelector(selectUserId);
  const chat = useAppSelector(selectActiveChat);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (refFlag.current) {
      socket.on(ACTIONS.CHAT.SEND, (data: set_message) => {
        dispatch(setMessage(data));
      });

      socket.on(ACTIONS.CHAT.NEWCHAT, (data: update_chat) => {
        dispatch(updateChatId(data));
      });
    }
    refFlag.current = false;
  }, []);

  React.useEffect(() => {
    scroll();
  }, [chat?.messages]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        sendMessage();
      }
      if (e.key === "Enter" && e.shiftKey) {
        scroll();
      }
    };
    refInput.current.addEventListener("keydown", onKeyDown);
    return () => refInput.current.removeEventListener("keydown", onKeyDown);
  }, [chat]);

  function sendMessage() {
    if (!chat || !userId) return;

    const input = refInput.current as HTMLDivElement;
    const text = input.innerHTML;
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();

    if (text.split(/<br>|\n/g).join("").length === 0) return;

    const { sideUserId, chatId } = chat;

    dispatch(
      setMessage({
        chatId,
        text,
        time,
        userId,
      })
    );
    socket.emit(ACTIONS.CHAT.SEND, { chatId, sideUserId, text, time });

    input.innerHTML = "";
    input.focus();
  }

  const scroll = () => {
    refBodyChat.current?.scroll(0, refBodyChat.current.scrollHeight);
  };

  const getMessages = () => {
    if (!userId) return [];

    if (chat)
      return chat?.messages.map((message) => {
        return { ...message, reverse: message.user_id === userId };
      });

    return [];
  };

  return (
    <Chat
      status={
        onlineUsers.includes(chat?.sideUserId || -1) ? "online" : "offline"
      }
      refBody={refBodyChat}
      messages={getMessages()}
      onClickSend={sendMessage}
      firstName={chat?.firstName || ""}
      secondName={chat?.secondName || ""}
      getRefInput={(ref) => (refInput.current = ref.current)}
    />
  );
};

export default ChatContainer;
