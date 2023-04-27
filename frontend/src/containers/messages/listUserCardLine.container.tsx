import React from "react";
import UserCardLine from "../../components/userCardLine";

import avatar from "../../assets/img/avatar.jpg";

const ListUserCardLineContainer: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  const onClick = () => {};

  const arr = [...new Array(5)];

  return (
    <>
      {arr.map((_, i) => (
        <UserCardLine
          key={i}
          userName={"asd"}
          userText={"asd"}
          avatar={avatar}
          onClick={onClick}
          className={className}
        />
      ))}
    </>
  );
};

export default ListUserCardLineContainer;
