type messages = {
  text: string;
  time: string;
  reverse: boolean;
};

export interface chat {
  chats: {
    userId: number;
    firstName: string;
    secondName: string;
    messages: messages[];
  };
}
