import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const initialValues = { email: "", password: "" };

const AddItemModal = ({ onClose, isLoading }) => {
  const { values, handleChange, setValues } = useForm(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      name="login-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      hasAlternativeButton={true}
      alternativeButtonText="or Register"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        id="email"
        value={values.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        id="password"
        value={values.password}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default AddItemModal;
