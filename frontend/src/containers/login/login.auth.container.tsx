import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "../../components/login";

import GetText from "../../hooks/getText";
import { useMutationAuthorization, useQueryItsMe } from "../../hooks/queries";

import generateEmptyObj from "../../utils/generateEmptyObj";
import objValueNotEmpty from "../../utils/objValueNotEmpty";

import { arrInput } from "../../components/login/types";
import { post } from "../../services/requests/types";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { fetchItsMe } from "./../../redux/slices/account/slice";
import { selectUserId } from "./../../redux/slices/account/selectors";

const NAMES = {
  email: "email",
  password: "password",
};

const LoginAuthContainer: React.FC<{ className?: string }> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(selectUserId);
  const { email, password, signIn, validate } = GetText().Login;
  const [enableButton, setEnableButton] = React.useState(false);
  const [inputValues, setInputValues] = React.useState(
    generateEmptyObj(NAMES, "")
  );
  const [invalid, setInvalid] = React.useState(false);

  const mutation = useMutationAuthorization({
    onSuccess: () => dispatch(fetchItsMe()),
    onError: () => {
      setInvalid(true);
    },
  });

  React.useEffect(() => {
    if (userId) navigate(`/?user=${userId}`);
  }, [userId]);

  const arrInput: arrInput[] = [
    {
      label: email,
      name: NAMES.email,
      invalid,
    },
    {
      label: password,
      name: NAMES.password,
      typeInput: "password",
      invalid,
      info: { ulHeader: validate.auth },
    },
  ];

  React.useEffect(() => {
    const checkEmpty = objValueNotEmpty(inputValues);
    setEnableButton(checkEmpty);
  }, [inputValues]);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInvalid(false);
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const onClickHandle = () => {
    mutation.mutate(inputValues as post["authorization"]["req"]);
  };

  return (
    <Login
      arrInput={arrInput}
      onChangeEvent={onChangeHandle}
      className={className}
      outline_Color={"rgb(108, 120, 249)"}
      textButton={signIn}
      headerText={signIn}
      enableButton={enableButton}
      onClickButton={onClickHandle}
    />
  );
};

export default LoginAuthContainer;
