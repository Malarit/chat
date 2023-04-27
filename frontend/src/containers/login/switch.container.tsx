import React from "react";
import ButtonLogin from "../../ui/buttonLogin";

import Switch from "../../components/switch";

import GetText from "../../hooks/getText";

type switchContainer = {
  components: JSX.Element[];
  className?: string;
  classNameButton?: string;
};

const SwitchContainer: React.FC<switchContainer> = (props) => {
  const { components, className, classNameButton } = props;

  const [next, setNext] = React.useState(0);
  const text = GetText().Login;

  const login = [text.signUp, text.signIn];

  const onCLickButton = () => {
    if (next == components.length - 1) {
      setNext(0);
      return;
    }

    setNext((next) => next + 1);
  };

  return (
    <>
      <Switch component={components[next]} className={className} />
      <ButtonLogin
        text={login[next]}
        onCLick={onCLickButton}
        className={classNameButton}
      />
    </>
  );
};

export default SwitchContainer;
