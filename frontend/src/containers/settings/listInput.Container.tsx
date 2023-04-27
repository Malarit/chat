import React from "react";
import debounce from "lodash.debounce";

import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "./../../redux/hooks";

import ListInput from "../../components/listInput";
import { useQueryUser } from "../../hooks/queries";

import { selectUserId } from "./../../redux/slices/account/selectors";
import { setUpdatesValues } from "../../redux/slices/settings/slice";

import { list } from "../../components/listInput/types";
import { get } from "../../services/requests/types";

type resData = Omit<
  get["user"]["res"],
  "id" | "createdAt" | "avatar" | "poster"
>;

type initalValueType = Record<keyof resData, string>;

const initalValue: initalValueType = {
  userName: "",
  description: "",
  firstName: "",
  secondName: "",
  city: "",
};

const listValue: list<keyof resData>[] = [
  {
    label: "Логин",
    name: "userName",
  },
  {
    label: "Имя",
    name: "firstName",
  },
  {
    label: "Фамилия",
    name: "secondName",
  },
  {
    label: "Описание",
    name: "description",
  },
  {
    label: "Город",
    name: "city",
  },
];

const ListInputContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [value, setValue] = React.useState<initalValueType>(initalValue);
  const { data } = useQueryUser(userId);

  const newListValue = listValue.map((item) => ({
    ...item,
    value: item.name && value[item.name],
  }));

  React.useEffect(() => {
    if (!data) return;
    const { userName, firstName, description, secondName, city } = data;
    setValue({
      userName,
      firstName: firstName ?? "",
      description: description ?? "",
      secondName: secondName ?? "",
      city: city ?? "",
    });
  }, [data]);

  const saveInRedux = React.useCallback(
    debounce((key: keyof initalValueType, value: string) => {
      dispatch(
        setUpdatesValues({
          key,
          value,
        })
      );
    }, 300),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof resData;
    const targetvalue = e.target.value;

    setValue((value) => ({ ...value, [name]: targetvalue }));
    saveInRedux(name, targetvalue);
  };

  return (
    <ListInput list={newListValue} header={"Настройки"} onChange={onChange} />
  );
};

export default ListInputContainer;
