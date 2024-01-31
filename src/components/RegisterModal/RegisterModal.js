import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";

const initialValues = { email: "", password: "", name: "", avatar: "" };

const RegisterModal = ({ onClose, isLoading, onRegister, onClickLogin }) => {
  const [values, setValues] = useState(initialValues);
  const [validity, setValidity] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false,
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setSubmitEnabled(
      validity.email && validity.password && validity.name && validity.avatar
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setValidity({ ...validity, [name]: e.target.validity.valid });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up..." : "Next"}
      name="signup-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      hasAlternativeButton={true}
      alternativeButtonText="or Log in"
      alternativeButtonClick={onClickLogin}
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
      <TextInput
        labelText="Name"
        type="text"
        name="name"
        placeholder="Name"
        value={values.name}
        validity={validity.name}
        errorText="Name must be between 2 and 30 characters"
        minLength={2}
        maxLength={30}
        required={true}
        onChange={handleChange}
      />
      <TextInput
        labelText="Avatar URL"
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        value={values.avatar}
        validity={validity.avatar}
        errorText="Invalid URL"
        required={true}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
