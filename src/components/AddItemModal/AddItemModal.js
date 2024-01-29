import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";

const initialValues = { name: "", imageUrl: "", weather: "hot" };

const AddItemModal = ({ onAddItem, onClose, isLoading }) => {
  const [values, setValues] = useState(initialValues);
  const [validity, setValidity] = useState({ name: false, imageUrl: false });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setSubmitEnabled(validity.name && validity.imageUrl);
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setValidity({ ...validity, [name]: e.target.validity.valid });
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
      submitEnabled={submitEnabled}
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
        onChange={handleChange}
      />
      <TextInput
        labelText="Image*"
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        initialValue=""
        errorText="Invalid Image URL"
        required={true}
        onChange={handleChange}
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
