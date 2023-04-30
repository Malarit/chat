import UserCardLine from "../../components/userCardLine";
import { useAppDispatch } from "./../../redux/hooks";

import useScreensUrlParams from "../../hooks/useScreensUrlParams";
import { useQueryUsers } from "../../hooks/queries";

import { setImgDomain } from "../../services/setImgDomain";
import { setActiveScreen } from "../../redux/slices/screen/slice";

import avatar from "../../assets/img/avatar.jpg";

const UserCardLineListContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const { data } = useQueryUsers();
  const { setScreenParams } = useScreensUrlParams();

  const onClick = (id: number) => {
    setScreenParams("MyPage", {
      user: id.toString(),
    });
    dispatch(setActiveScreen("MyPage"));
  };

  const arr = data?.map((user, key) => (
    <UserCardLine
      userName={user.firstName + " " + user.secondName}
      userText={user.description || ""}
      onClick={() => onClick(user.id)}
      avatar={setImgDomain(user.avatar) ?? avatar}
    />
  ));

  return (
    <div className={className}>
      {arr?.map((item, key) => (
        <div key={key}>{item}</div>
      ))}
    </div>
  );
};

export default UserCardLineListContainer;
