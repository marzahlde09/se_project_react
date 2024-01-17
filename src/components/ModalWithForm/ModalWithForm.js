import React from "react";
import "./ModalWithForm.css";
import "../Modal.css";

function ModalWithForm({
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
  hasAlternativeButton,
  alternativeButtonText,
}) {
  return (
    <section className={`modal modal_type_${name}`}>
      <form name={`${name}`} className="form modal__form" onSubmit={onSubmit}>
        <button
          onClick={onClose}
          type="button"
          className="form__close-button"
        />
        <p className="form__title">{title}</p>
        {children}
        <div className="form__button-wrapper">
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
          {hasAlternativeButton && (
            <button type="button" className="form__alternative-button">
              {alternativeButtonText}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ModalWithForm;
