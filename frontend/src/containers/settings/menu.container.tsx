import Menu from "../../components/menu";
import { useMutation } from "react-query";
import { useAppSelector } from "./../../redux/hooks";

import { listObj } from "../../ui/list/types";
import { put } from "../../services/requests/types";

import axi from "./../../services/requests/requests";
import { selectAll } from "../../redux/slices/settings/selectors";
import { objectUrlToBlob } from "../../utils/objectUrlToBlob";

import gear from "../../assets/icons/gear.svg";

type menuContainer = {
  className?: string;
  ulClassName?: string;
  liClassName?: string;
};

const clickValues = ["Poster", "Avatar", "User", "Save"] as const;
type clickValue = (typeof clickValues)[number];

const list: listObj<clickValue>[] = [
  {
    text: "Постер",
    img: gear,
    clickValue: "Poster",
  },
  {
    text: "Аватар",
    img: gear,
    clickValue: "Avatar",
  },
  {
    text: "Пользователь",
    img: gear,
    clickValue: "User",
  },
  {
    text: "Сохранить",
    img: gear,
    clickValue: "Save",
  },
];

const MenuContainer: React.FC<menuContainer> = (props) => {
  const changes = useAppSelector(selectAll);
  const mutation = useMutation((data: put["user"]) => axi.put.user(data));

  const putData = async () => {
    const formData = new FormData();
    const { avatar, poster, ...data } = changes;

    for (let key in data) {
      const value = data[key as keyof typeof data];
      if (value) {
        formData.append(key, value);
      }
    }

    if (changes.avatar) {
      let blob = await objectUrlToBlob(changes.avatar);
      formData.append("avatar", blob);
    }
    if (changes.poster) {
      let blob = await objectUrlToBlob(changes.poster);
      formData.append("poster", blob);
    }

    mutation.mutate(formData);
  };

  const onCLickLi = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    clickValue: clickValue
  ) => {
    switch (clickValue) {
      case "Save":
        putData();
        break;
    }
  };

  return <Menu list={list} onClickLi={onCLickLi} {...props} />;
};

export default MenuContainer;

//poster = (await blobToBase64(blob)) as string;
