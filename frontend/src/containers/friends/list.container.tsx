import JsxList from "../../components/jsxList";
import UserCardLine from "../../components/userCardLine";

import avatar from "../../assets/img/avatar.jpg";

const ListContainer: React.FC<{ className?: string }> = ({ className }) => {
  const arr = [...new Array(3)].map((_, key) => (
    <UserCardLine userName={"asdasd"} userText={"asdasdasdasdasdasd"} avatar={avatar} />
  ));

  return (
    <div className={className}>
      {arr.map((item, key) => (
        <div key={key}>{item}</div>
      ))}
    </div>
  );
};

export default ListContainer;
