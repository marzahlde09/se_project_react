import React from "react";
import "./TextInput.css";

const TextInput = ({
  labelText,
  type,
  name,
  placeholder,
  value,
  validity,
  errorText,
  required,
  minLength,
  maxLength,
  onChange,
}) => {
  //const [value, setValue] = useState(initialValue);
  //const [validity, setValidity] = useState(true);

  /*const handleChange = (e) => {
    setValue(e.target.value);
    setValidity(e.target.validity.valid);
    onChange(e);
  };*/

  return (
    <div className="text-input">
      {validity ? (
        <label htmlFor={name} className="text-input__label">
          {labelText}
        </label>
      ) : (
        <label
          htmlFor={name}
          className="text-input__label text-input__label_error"
        >
          {errorText}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-input__input"
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextInput;
