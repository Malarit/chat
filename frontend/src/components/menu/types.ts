import { array } from "../../ui/list/types";

import { onClickLi } from "../../ui/list/types";

export type menu = {
  list: array;
  className?: string;
  ulClassName?: string;
  liClassName?: string;
  onClickLi?: onClickLi;
  clickValueActive?: any;
};
