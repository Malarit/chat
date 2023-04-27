import React from "react";
import { useAppDispatch } from "./../../redux/hooks";

import Header from "../../components/header";

import bodyClickEvent from "../../utils/bodyClickEvent";

import { listObj } from "../../ui/list/types";

import gear from "../../assets/icons/gear.svg";
import exit from "../../assets/icons/exit.svg";
import { setActiveScreen } from "../../redux/slices/screen/slice";
import { isScreens } from "./../../redux/slices/screen/types";

const popapValue: listObj<string>[] = [
  {
    text: "Настройки",
    img: gear,
    clickValue: "Settings",
  },
  {
    text: "Выход",
    img: exit,
    clickValue: "Exit",
  },
];

const HeaderContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [popapActive, setPopapActive] = React.useState(false);

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(
    bodyClickEvent((e) => {
      const check = ref.current && e.composedPath().includes(ref.current);
      if (!check) setPopapActive(false);
    }),
    []
  );

  const onClickPopapLi = (e: any, clickValue: string) => {
    const check = clickValue === "Settings" && isScreens(clickValue);

    if (check) {
      dispatch(setActiveScreen(clickValue));
    }
  };

  return (
    <Header
      popapValue={popapValue}
      onClickUser={() => setPopapActive(!popapActive)}
      popapOpen={popapActive}
      refButton={ref}
      onClickPopapLi={onClickPopapLi}
    />
  );
};

export default HeaderContainer;
