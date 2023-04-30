type messages = {
  text: string;
  time: string;
  reverse: boolean;
};

export interface chats {
  chats: {
    chatId: string;
    sideUserId: number;
    firstName: string;
    secondName: string;
    messages: messages[];
  };
}

export type chatType = chats & { chatActive: string };
