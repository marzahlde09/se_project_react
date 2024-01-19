import React, { useEffect, useState } from "react";
import "./TextInput.css";
import { useForm } from "../../hooks/useForm";

const TextInput = ({ labelText, type, name, placeholder, initialValue }) => {
  const { values, handleChange, setValues } = useForm({ [name]: initialValue });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setValues({ [name]: initialValue });
  }, []);

  return (
    <div className="text-input">
      <label htmlFor={name} className="text-input__label">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={values.name}
        onChange={handleChange}
        className="text-input__input"
      />
    </div>
  );
};

export default TextInput;
