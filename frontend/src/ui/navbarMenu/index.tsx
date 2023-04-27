import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

const NavbarMenu: React.FC = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className={cn(style.root, { [style.active]: active })}
      onClick={() => setActive(!active)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default NavbarMenu;
