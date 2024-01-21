import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import TextInput from "../TextInput/TextInput";
import { AddItemValidityContext } from "../../contexts/AddItemValidityContext";
import { useForm } from "../../hooks/useForm";

const initialValues = { name: "", imageUrl: "", weather: "hot" };

const AddItemModal = ({ onAddItem, onClose, isLoading }) => {
  const { values, handleChange, setValues } = useForm(initialValues);
  const [ validity, setValidity ] = useState({name: false, imageUrl: false})

  useEffect(() => {
    setValues(initialValues);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  return (
    <AddItemValidityContext.Provider
          value={{ validity, setValidity }}
    >
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
          errorText="Invalid Name"
          required = {true}
          minLength = {2}
          maxLength = {30}
          className="form__text-input"
        />
        <label htmlFor="url">Image*</label>
        <input
          type="url"
          name="imageUrl"
          required
          placeholder="Image URL"
          id="url"
          value={values.imageUrl}
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
    </AddItemValidityContext.Provider>
  );
};

export default AddItemModal;
