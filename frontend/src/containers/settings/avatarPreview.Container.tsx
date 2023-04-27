import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import AvatarPreview from "../../components/avatarPreview";

import { setUpdatesValues } from "../../redux/slices/settings/slice";
import { selectValueByKey } from "../../redux/slices/settings/selectors";
import { selectUserId } from "./../../redux/slices/account/selectors";
import { setImgDomain } from "./../../services/setImgDomain";
import { useQueryUser } from "../../hooks/queries";

import avatar from "../../assets/img/avatar.jpg";

import GetText from "../../hooks/getText";

const AvatarPreviewContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const file = useAppSelector(selectValueByKey("avatar"));
  const userId = useAppSelector(selectUserId);
  const { screens } = GetText().Home;

  const { data } = useQueryUser(userId);

  const refFileInput = React.useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    refFileInput.current?.click();
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    dispatch(
      setUpdatesValues({
        key: "avatar",
        value: URL.createObjectURL(file),
      })
    );
  };

  return (
    <AvatarPreview
      avatar={file || (setImgDomain(data?.avatar) ?? avatar)}
      headerText={"Аватар"}
      buttonText={screens.settings.button}
      onChangeInputFile={onChangeFileInput}
      onClickButton={onClickButton}
      refInputFile={refFileInput}
    />
  );
};

export default AvatarPreviewContainer;
