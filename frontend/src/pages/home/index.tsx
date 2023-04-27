import React from "react";

import HeaderContainer from "../../containers/header/header.container";
import MenuContainer from "../../containers/home/menu.container";
import SplitScreenContainer from "../../containers/home/splitScreen.container";
import SwitchContainer from "../../containers/home/switch.container";

import MyPage from "../../screens/myPage";
import Friends from "../../screens/friends";
import Settings from "../../screens/settings";
import Messages from "../../screens/messages";

import style from "./index.module.scss";

const Home: React.FC = () => {
  return (
    <div className={style.root}>
      <HeaderContainer />
      <div className={style.container}>
        <SplitScreenContainer
          classNameRoot={style.splitScreen}
          aside={
            <MenuContainer
              className={style.menuClassName}
              liClassName={style.menu_liClassName}
              ulClassName={style.menu_ulClassName}
            />
          }
          body={
            <div className={style.screen}>
              <SwitchContainer
                components={[
                  {
                    screen: "MyPage",
                    element: <MyPage />,
                  },
                  {
                    screen: "Friends",
                    element: <Friends />,
                  },
                  {
                    screen: "Settings",
                    element: <Settings />,
                  },
                  {
                    screen: "Messages",
                    element: <Messages />,
                  },
                ]}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Home;
