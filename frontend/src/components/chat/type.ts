export type message = {
  text: string;
  time: string;
  reverse?: boolean;
};

export type chat = {
  firstName: string;
  secondName: string;
  status: string;
  sendActive?: boolean;
  messages: message[];
  onClickSend?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  getRefInput?: (ref: React.RefObject<HTMLDivElement>) => void;
  refBody?: React.RefObject<HTMLDivElement>;
};
