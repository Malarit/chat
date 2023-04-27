import React from "react";

import style from "./index.module.scss";

import UserHeaderContainer from "../../containers/myPage/userHeader.container";
import Block from "../../components/block";

const MyPage: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.userHeader}>
        <Block disablePadding element={<UserHeaderContainer />} />
      </div>
    </div>
  );
};

export default MyPage;
