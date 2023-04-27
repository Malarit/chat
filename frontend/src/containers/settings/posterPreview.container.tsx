import React from "react";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";

import PosterPreview from "../../components/posterPreview";

import { setUpdatesValues } from "../../redux/slices/settings/slice";

import poster from "../../assets/img/poster.webp";

import GetText from "./../../hooks/getText";
import { selectValueByKey } from "../../redux/slices/settings/selectors";
import { setImgDomain } from "../../services/setImgDomain";
import { useQueryUser } from "../../hooks/queries";
import { selectUserId } from "./../../redux/slices/account/selectors";

const PosterPreviewContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const file = useAppSelector(selectValueByKey("poster"));
  const userId = useAppSelector(selectUserId);

  const { screens } = GetText().Home;
  const { data } = useQueryUser(userId);
  
  const [active, setActive] = React.useState(false);
  const refFileInput = React.useRef<HTMLInputElement>(null);

  const onClickBUtton = () => {
    refFileInput.current?.click();
  };

  const onChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    dispatch(
      setUpdatesValues({
        key: "poster",
        value: URL.createObjectURL(file),
      })
    );
  };

  return (
    <PosterPreview
      active={active}
      poster={file || (setImgDomain(data?.poster) ?? poster)}
      headerText={screens.settings.poster}
      refFileInput={refFileInput}
      textButton={screens.settings.button}
      onClickButton={onClickBUtton}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onChangeFileInput={onChangeFileInput}
    />
  );
};

export default PosterPreviewContainer;
