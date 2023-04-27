import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type toggle = {
  checked?: (e: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const Toggle: React.FC<toggle> = (props) => {
  const { checked, onClick } = props;
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    checked?.(toggle);
  }, [toggle]);

  const onClickInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setToggle(!toggle);
    onClick?.(e);
  };

  const getClassNames = () => {
    return {
      background: cn(style.background, { [style.active]: toggle }),
      circle: cn({ [style.active]: toggle }),
    };
  };

  return (
    <div className={style.root}>
      <div className={getClassNames().background}>
        <div className={getClassNames().circle}></div>
      </div>
      <input type="checkbox" onClick={onClickInput} />
    </div>
  );
};

export default Toggle;
