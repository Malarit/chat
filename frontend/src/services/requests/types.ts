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
      firstUser: number;
      secondUser: number;
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
      firstName?: string;
      secondName?: string;
      description?: string;
      city?: string;
    };
  };
}

export interface put {
  user: FormData;
}
