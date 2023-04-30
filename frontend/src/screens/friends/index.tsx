import React from "react";
import Block from "../../components/block";

import SplitScreenContainer from "../../containers/friends/splitScreen.container";
import UserCardLineListContainer from "../../containers/friends/UserCardLineList.container";

import style from "./index.module.scss";

const Friends: React.FC = () => {
  return (
    <div className={style.root}>
      <SplitScreenContainer
        classNameRoot={style.splitScreen}
        aside={<Block disablePadding element={<UserCardLineListContainer />} />}
        body={<></>}
      />
    </div>
  );
};

export default Friends;
