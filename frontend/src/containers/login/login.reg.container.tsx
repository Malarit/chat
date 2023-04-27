import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "../../components/login";
import { arrInput } from "../../components/login/types";

import objValueNotEmpty from "../../utils/objValueNotEmpty";
import generateEmptyObj from "../../utils/generateEmptyObj";
import objFilledSingleValue from "../../utils/objFilledSingleValue";
import fillObjSingleValue from "../../utils/fillObjSingleValue";

import getText from "../../hooks/getText";
import { useMutationRegistration } from "../../hooks/queries";

import regex from "../../services/regex";
import { post } from "../../services/requests/types";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserId } from "../../redux/slices/account/selectors";
import { fetchItsMe } from "../../redux/slices/account/slice";

const NAMES = {
  userName: "userName",
  email: "email",
  password: "password",
  secondPassword: "secondPassword",
};

const LoginRegContainer: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(selectUserId);

  const { email, password, signUp, userName, secondPassword, validate } =
    getText().Login;

  // States
  const [enableButton, setEnableButton] = React.useState(false);
  const [inputValues, setInputValues] = React.useState(
    generateEmptyObj(NAMES, "")
  );
  const [validateValues, setValidateValues] = React.useState(
    generateEmptyObj(NAMES, false)
  );

  // Fetch
  const mutation = useMutationRegistration({
    onSuccess: () => dispatch(fetchItsMe()),
    onError: () => {
      setValidateValues((values) => fillObjSingleValue(values, true));
    },
  });

  React.useEffect(() => {
    if (userId) navigate(`/?user=${userId}`);
  }, [userId]);

  // arr
  const arrInput: arrInput[] = [
    {
      label: userName,
      name: NAMES.userName,
      info: {
        ulHeader: validate.userName.header,
        textLi: validate.userName.li,
      },
      invalid: validateValues[NAMES.userName],
    },
    {
      label: email,
      name: NAMES.email,
      info: { ulHeader: validate.email },
      invalid: validateValues[NAMES.email],
    },
    {
      label: password,
      name: NAMES.password,
      typeInput: "password",
      info: {
        ulHeader: validate.password.header,
        textLi: validate.password.li,
      },
      invalid: validateValues[NAMES.password],
    },
    {
      label: secondPassword,
      name: NAMES.secondPassword,
      typeInput: "password",
      info: { ulHeader: validate.secondPassword },
      invalid: validateValues[NAMES.secondPassword],
    },
  ];

  // EnableButton
  React.useEffect(() => {
    const checkEmpty = objValueNotEmpty(inputValues);
    const checkFalse = objFilledSingleValue(validateValues, false);

    setEnableButton(checkEmpty && checkFalse);
  }, [validateValues]);

  // Handles
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const onBlurHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const name = e.target.name;

    const validate = {
      [NAMES.userName]: !regex.latinAndNumbers.test(inputValues[name]),
      [NAMES.email]: !regex.email.test(inputValues[name]),
      [NAMES.password]: !regex.password.test(inputValues[name]),
      [NAMES.secondPassword]:
        inputValues[NAMES.password] !== inputValues[NAMES.secondPassword],
    };

    setValidateValues((values) => ({ ...values, [name]: validate[name] }));
  };

  const onClickHandle = () => {
    mutation.mutate(inputValues as post["registration"]["req"]);
  };

  return (
    <Login
      arrInput={arrInput}
      onChangeEvent={onChangeHandle}
      className={className}
      outline_Color={"rgb(108, 120, 249)"}
      textButton={signUp}
      headerText={signUp}
      enableButton={enableButton}
      onClickButton={onClickHandle}
      onBlur={onBlurHandle}
    />
  );
};

export default LoginRegContainer;
