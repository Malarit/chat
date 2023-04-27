import { info } from "../../ui/info";
import { input } from "../../ui/input";

type sliceInput = Omit<
  input,
  "onChangeEvent" | "outline_Color" | "invalid_Color" | "onBlur"
>;

export type arrInput = sliceInput & {
  info?: info;
};

export type login = {
  arrInput: arrInput[];
  onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outline_Color?: string;
  invalid_Color?: string;
  className?: string;
  onClickButton?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  textButton?: string;
  enableButton?: boolean;
  headerText?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};
