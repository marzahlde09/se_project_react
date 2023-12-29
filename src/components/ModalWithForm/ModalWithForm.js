import React from "react";
import "./ModalWithForm.css";
import "../Modal.css";

function ModalWithForm({
  onClose,
  name,
  title,
  buttonText,
  children,
  onAddItem,
}) {
  return (
    <section className={`modal modal_type_${name}`}>
      <form name={`${name}`} className="form modal__form" onSubmit={onAddItem}>
        <button
          onClick={onClose}
          type="button"
          className="form__close-button"
        />
        <p className="form__title">{title}</p>
        {children}
        <button type="submit" className="form__submit">
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default ModalWithForm;
