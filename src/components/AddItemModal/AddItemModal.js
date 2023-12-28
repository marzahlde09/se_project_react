import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, onClose }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("Hot");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("hot");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name: name, imageUrl: imageUrl, weather: weather });
  }

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onChangeUrl(e) {
    setImageUrl(e.target.value);
  }

  function onChangeWeather(e) {
    setWeather(e.target.id);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="garment-form"
      onClose={onClose}
      onAddItem={handleSubmit}
    >
      <label htmlFor="name">Name*</label>
      <input
        type="text"
        required
        placeholder="Name"
        id="name"
        value={name}
        onChange={onChangeName}
      />
      <label htmlFor="url">Image*</label>
      <input
        type="url"
        required
        placeholder="Image URL"
        id="url"
        value={imageUrl}
        onChange={onChangeUrl}
      />
      <p>Select the weather type:</p>
      <label>
        <input
          type="radio"
          id="hot"
          name="weather"
          value="Hot"
          required
          checked={"hot" === weather ? true : false}
          onChange={onChangeWeather}
        />
        Hot
      </label>
      <label>
        <input
          type="radio"
          id="warm"
          name="weather"
          value="Warm"
          checked={"warm" === weather ? true : false}
          onChange={onChangeWeather}
        />
        Warm
      </label>
      <label>
        <input
          type="radio"
          id="cold"
          name="weather"
          value="Cold"
          checked={"cold" === weather ? true : false}
          onChange={onChangeWeather}
        />
        Cold
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
