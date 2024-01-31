import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";

const initialValues = { email: "", password: "" };
const initialValidity = { email: false, password: false };

const LoginModal = ({ onClose, isLoading, handleLogin, onClickRegister }) => {
  const [values, setValues] = useState(initialValues);
  const [validity, setValidity] = useState(initialValidity);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setSubmitEnabled(validity.email && validity.password);
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
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
        value={values.email}
        validity={validity.email}
        errorText="Invalid email"
        required={true}
        onChange={handleChange}
      />
      <TextInput
        labelText="Password"
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        validity={validity.password}
        errorText="Incorrect password"
        required={true}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default LoginModal;
