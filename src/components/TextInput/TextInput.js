import React, { useState, useContext } from "react";
import { AddItemValidityContext } from "../../contexts/AddItemValidityContext";
import "./TextInput.css";

const TextInput = ({ labelText, type, name, placeholder, initialValue, errorText, required, minLength, maxLength, onChange }) => {
  const { validity, setValidity } = useContext(AddItemValidityContext);
  const [value, setValue] = useState(initialValue);

 const handleChange = (e) => {
    const {name, value} = e.target;
    setValue(value);
    setValidity({...validity, [name]: e.target.validity.valid});
    onChange();
  }

  return (
    <div className="text-input">
      {validity ?
      <label htmlFor={name} className="text-input__label">
        {labelText}
      </label> :
      <label htmlFor={name} className="text-input__label text-input__label_error">
        {errorText}
      </label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="text-input__input"
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextInput;
