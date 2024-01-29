import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";

const initialValues = { email: "", password: "" };
const initialValidity = { email: false, password: false };

const LoginModal = ({ onClose, isLoading, handleLogin, onClickRegister }) => {
  const [values, setValues] = useState(initialValues);
  const [validity, setValidity] = useState(initialValidity);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setSubmitEnabled(validity.email && validity.password);
  });

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          onClose();
          handleLogin();
          history.push("/profile");
        }
      })
      .catch((err) => console.error(err));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setValidity({ ...validity, [name]: e.target.validity.valid });
    setSubmitEnabled(validity.email && validity.password);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      name="login-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      hasAlternativeButton={true}
      alternativeButtonText="or Register"
      alternativeButtonClick={onClickRegister}
      submitEnabled={submitEnabled}
    >
      <TextInput
        labelText="Email"
        type="email"
        name="email"
        placeholder="Email"
        initialValue=""
        errorText="Invalid email"
        required={true}
        onChange={handleChange}
      />
      <TextInput
        labelText="Password"
        type="password"
        name="password"
        placeholder="Password"
        initialValue=""
        errorText="Incorrect password"
        required={true}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default LoginModal;
