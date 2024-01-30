import React, { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isLoading, handleEditProfile }) => {
  const [values, setValues] = useState({name: "", avatar: ""});
  const [validity, setValidity] = useState({
    name: true,
    avatar: true,
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setSubmitEnabled(validity.name && validity.avatar);
  });

  useEffect(() => {
    setValues({ name: currentUser.name, avatar: currentUser.avatar });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    handleEditProfile(values);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setValidity({ ...validity, [name]: e.target.validity.valid });
    setSubmitEnabled(validity.name && validity.avatar);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      name="edit-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      hasAlternativeButton={false}
      alternativeButtonText=""
      submitEnabled={submitEnabled}
    >
      <TextInput
        labelText="Name*"
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

export default EditProfileModal;
