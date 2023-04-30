import React from "react";
import { useAppSelector } from "../../redux/hooks";

import UserHeader from "../../components/userHeader";

import useScreensUrlParams from "../../hooks/useScreensUrlParams";
import { setImgDomain } from "./../../services/setImgDomain";
import { useQueryUser } from "../../hooks/queries";

import { selectUserId } from "../../redux/slices/account/selectors";

import avatarDef from "../../assets/img/avatar.jpg";
import posterDef from "../../assets/img/poster.webp";

const UserHeaderContainer: React.FC = () => {
  const { searchParams } = useScreensUrlParams();
  const [userId, setUserId] = React.useState(0);
  const [itsMe, setItsMe] = React.useState(false);
  const userIdRedux = useAppSelector(selectUserId);

  React.useEffect(() => {
    const id = searchParams.get("user");
    setUserId(Number(id));
  }, []);

  React.useEffect(() => {
    setItsMe(userId === userIdRedux);
  }, [userId]);

  const { data } = useQueryUser(userId);

  const getName = () => {
    const firstName = data?.firstName || "FirstName";
    const secondName = data?.secondName || "SecondName";

    return firstName + " " + secondName;
  };

  const headerData = {
    avatar: setImgDomain(data?.avatar) || avatarDef,
    poster: setImgDomain(data?.poster) || posterDef,
    userName: getName(),
    city: data?.city ?? "City",
  };

  function onClickLeft() {}

  function onClickRigh() {}

  return (
    <UserHeader
      data={headerData}
      btnTextLeft={itsMe ? "Хз" : "Написать"}
      btnTextRight={itsMe ? "Хз" : "Добавить в друзья"}
      onClickLeft={() => {}}
      onClickRight={() => {}}
    />
  );
};

export default UserHeaderContainer;
