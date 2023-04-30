import React from "react";
import Chat from "../../components/chat";
import { useMutationMessage } from "../../hooks/queries";

import { message } from "../../components/chat/type";

const ChatContainer: React.FC = () => {
  const refInput = React.useRef<any>(null);
  const refBodyChat = React.useRef<HTMLDivElement>(null);
  // const mutation = useMutationMessage();
  const [messages, setMessages] = React.useState<message[]>([
    {
      text: "asd",
      time: "8:55",
    },
    {
      text: "asd",
      time: "8:55",
    },
  ]);

  const sendMessage = () => {
    const input = refInput.current as HTMLDivElement;
    const date = new Date();

    setMessages((current) => [
      ...current,
      {
        text: input.innerHTML,
        time: date.getHours() + ":" + date.getMinutes(),
        reverse: true,
      },
    ]);
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Enter") sendMessage();
    };
    refInput.current.addEventListener("keydown", onKeyDown);
    return () => refInput.current.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Chat
      firstName={"firstName"}
      secondName={"secondName"}
      status={"online"}
      messages={messages}
      onClickSend={sendMessage}
      getRefInput={(ref) => (refInput.current = ref.current)}
      refBody={refBodyChat}
    />
  );
};

export default ChatContainer;
