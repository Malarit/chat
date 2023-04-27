import React from "react";
import { useAppSelector } from "../../redux/hooks";

import Switch from "../../components/switch";

import { screens } from "../../redux/slices/screen/types";
import { selectActiveScreen } from "../../redux/slices/screen/selectors";

import GetText from "../../hooks/getText";

type switchContainer = {
  components: {
    screen: screens;
    element: JSX.Element;
  }[];
  className?: string;
};

const SwitchContainer: React.FC<switchContainer> = (props) => {
  const { components, className } = props;

  const screen = useAppSelector(selectActiveScreen);

  const activeElement = components.find(
    (component) => component.screen === screen
  );

  return (
    <Switch component={activeElement?.element ?? <></>} className={className} />
  );
};

export default SwitchContainer;
