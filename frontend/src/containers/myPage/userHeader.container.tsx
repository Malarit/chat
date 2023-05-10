import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "./../../redux/hooks";

import UserHeader from "../../components/userHeader";

import useScreensUrlParams from "../../hooks/useScreensUrlParams";
import { useQueryUser } from "../../hooks/queries";
import { setImgDomain } from "./../../services/setImgDomain";

import { setActiveScreen } from "../../redux/slices/screen/slice";
import { selectUserId } from "../../redux/slices/account/selectors";
import { addChat } from "../../redux/slices/chats/slice";

import avatarDef from "../../assets/img/avatar.jpg";
import posterDef from "../../assets/img/poster.webp";

const UserHeaderContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useScreensUrlParams();
  const [userId, setUserId] = React.useState(0);
  const [itsMe, setItsMe] = React.useState(false);
  const userIdRedux = useAppSelector(selectUserId);
  const { data } = useQueryUser(userId);

  React.useEffect(() => {
    const id = searchParams.get("user");
    setUserId(Number(id));
  }, []);

  React.useEffect(() => {
    setItsMe(userId === userIdRedux);
  }, [userId]);

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

  function onClickLeft() {
    if (itsMe) {
      return;
    }

    if (!data) return;

    const { id, firstName, secondName, avatar } = data;

    dispatch(
      addChat({
        sideUserId: id,
        avatar: avatar || "",
        firstName,
        secondName,
      })
    );
    dispatch(setActiveScreen("Messages"));
  }

  function onClickRight() {}

  return (
    <UserHeader
      data={headerData}
      btnTextLeft={itsMe ? "Хз" : "Написать"}
      btnTextRight={itsMe ? "Хз" : "Добавить в друзья"}
      onClickLeft={onClickLeft}
      onClickRight={() => {}}
    />
  );
};

export default UserHeaderContainer;
