import React from "react";
import Block from "../../components/block";

import SplitScreenContainer from "../../containers/friends/splitScreen.container";
import ListContainer from "../../containers/friends/list.container";

import style from "./index.module.scss";

const Friends: React.FC = () => {
  return (
    <div className={style.root}>
      <SplitScreenContainer
        classNameRoot={style.splitScreen}
        aside={<Block disablePadding element={<ListContainer />} />}
        body={<></>}
      />
    </div>
  );
};

export default Friends;
