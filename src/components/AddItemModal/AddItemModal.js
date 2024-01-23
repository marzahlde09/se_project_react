import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";
import { useForm } from "../../hooks/useForm";

const initialValues = { name: "", imageUrl: "", weather: "hot" };

const AddItemModal = ({ onAddItem, onClose, isLoading }) => {
  const { values, handleChange, setValues } = useForm(initialValues);
  const [validity, setValidity] = useState({ name: false, imageUrl: false });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setValues(initialValues);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  const handleEnableSubmit = () => {
    if (validity.name && validity.imageUrl) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      name="garment-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      hasAlternativeButton={false}
      alternativeButtonText=""
    >
      <TextInput
        labelText="Name*"
        type="text"
        name="name"
        placeholder="Name"
        initialValue=""
        errorText="Name must be between 2 and 30 characters"
        required={true}
        minLength={2}
        maxLength={30}
        onChange={handleEnableSubmit}
      />
      <TextInput
        labelText="Image*"
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        initialValue=""
        errorText="Invalid Image URL"
        required={true}
        onChange={handleEnableSubmit}
      />
      <p>Select the weather type:</p>
      <label>
        <input
          type="radio"
          id="hot"
          name="weather"
          value="hot"
          required
          checked={"hot" === values.weather}
          onChange={handleChange}
        />
        Hot
      </label>
      <label>
        <input
          type="radio"
          id="warm"
          name="weather"
          value="warm"
          checked={"warm" === values.weather}
          onChange={handleChange}
        />
        Warm
      </label>
      <label>
        <input
          type="radio"
          id="cold"
          name="weather"
          value="cold"
          checked={"cold" === values.weather}
          onChange={handleChange}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
