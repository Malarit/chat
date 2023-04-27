export type listObj<T = any> = {
  text: string;
  img: string;
  clickValue?: T;
};

export type onClickLi = (
  e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  clickValue?: any
) => void;

export type array = listObj[] | string[] | JSX.Element[];

export type list = {
  list: array;
  ulClassName?: string;
  liClassName?: string;
  onClickLi?: onClickLi;
  clickValueActive?: any;
  liActiveClassName?: string;
};

export type get_value = (
  list: array,
  className: string | undefined,
  onClick?: onClickLi,
  liActiveClassName?: string,
  clickValueActive?: any
) => JSX.Element[] | "";

//
