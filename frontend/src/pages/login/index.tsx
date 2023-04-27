import React from "react";

import SplitScreenContainer from "../../containers/home/splitScreen.container";
import LoginAuthContainer from "../../containers/login/login.auth.container";
import LoginRegContainer from "../../containers/login/login.reg.container";
import SwitchContainer from "../../containers/login/switch.container";
import ObliqueBlock from "../../components/obliqueBlock";

import girl from "../../assets/img/girl.png";

import style from "./index.module.scss";

const Login: React.FC = () => {
  return (
    <div className={style.root}>
      <div>
        <SplitScreenContainer
          classNameRoot={style.splitScreen}
          aside={
            <div className={style.girl}>
              <img
                src={girl}
                alt="girl"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          }
          body={
            <ObliqueBlock
              element={
                <div className={style.switchContainer}>
                  <SwitchContainer
                    components={[<LoginAuthContainer />, <LoginRegContainer />]}
                  />
                </div>
              }
            />
          }
        />
      </div>
    </div>
  );
};

export default Login;
