export interface post {
  authorization: {
    req: {
      email: string;
      password: string;
    };
  };
  registration: {
    req: post["authorization"]["req"] & { userName: string };
  };
  message: {
    req: {
      sideUserId: number;
      text: string;
      time: string;
    };
  };
}

export interface get {
  itsMe: {
    res: {
      id: number;
    };
  };
  user: {
    res: {
      id: number;
      userName: string;
      avatar?: string;
      poster?: string;
      createdAt: string;
      firstName: string;
      secondName: string;
      description?: string;
      city?: string;
    };
  };
  chats: {
    res: {
      chatId: string;
      sideUserId: number;
      firstName: string;
      secondName: string;
      avatar: string;
      messages: {
        text: string;
        time: string;
        user_id: number;
      }[];
    };
  };
  messages: {
    res: {
      text: string;
      time: string;
      user_id: number;
    };
    req: {
      chatId: string;
    };
  };
}

export interface put {
  user: FormData;
}
