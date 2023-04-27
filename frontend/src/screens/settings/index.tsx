import React from "react";

import SplitScreen from "../../components/splitScreen";
import MenuContainer from "../../containers/settings/menu.container";
import JsxListContainer from "../../containers/settings/jsxList.Container";
import PosterPreviewContainer from "./../../containers/settings/posterPreview.container";
import AvatarPreviewContainer from "../../containers/settings/avatarPreview.Container";
import ListInputContainer from "../../containers/settings/listInput.Container";

import style from "./index.module.scss";

const Settings: React.FC = () => {
  return (
    <div className={style.root}>
      <SplitScreen
        classNameRoot={style.splitScreen}
        aside={
          <JsxListContainer
            classNameWrapper={style.jsxListWrapper}
            elements={[
              <PosterPreviewContainer />,
              <AvatarPreviewContainer />,
              <ListInputContainer />,
            ]}
          />
        }
        body={<MenuContainer liClassName={style.menu} />}
      />
    </div>
  );
};

export default Settings;
