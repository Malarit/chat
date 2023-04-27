export type list<name = string> = {
  label: string;
  name?: name;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  element?: JSX.Element;
};

export type listInput = {
  list: list[];
  header?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameRoot?: string;
  classNameLi?: string;
};
