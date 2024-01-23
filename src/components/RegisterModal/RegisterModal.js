import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";

const initialValues = { email: "", password: "", name: "", avatar: "" };

const RegisterModal = ({ onClose, isLoading }) => {
  const [values, setValues] = useState(initialValues);
  const [validity, setValidity] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false,
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setSubmitEnabled(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setValidity({ ...validity, [name]: e.target.validity.valid });
    setSubmitEnabled(
      validity.email && validity.password && validity.name && validity.avatar
    );
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
      <TextInput
        labelText="Name"
        type="text"
        name="name"
        placeholder="Name"
        initialValue=""
        errorText="Name must be between 2 and 30 characters"
        required={true}
        onChange={handleChange}
      />
      <TextInput
        labelText="Avatar URL"
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        initialValue=""
        errorText="Invalid URL"
        required={true}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
