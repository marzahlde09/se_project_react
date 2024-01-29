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
  alternativeButtonClick,
  submitEnabled,
}) {
  return (
    <section className={`modal modal_type_${name}`}>
      <form name={`${name}`} className="form modal__form" onSubmit={onSubmit}>
        <button
          onClick={onClose}
          type="button"
          className="form__close-button"
          formNoValidate
        />
        <p className="form__title">{title}</p>
        {children}
        <div className="form__button-wrapper">
          {submitEnabled ? (
            <button type="submit" className="form__submit">
              {buttonText}
            </button>
          ) : (
            <button
              type="submit"
              className="form__submit form__submit_disabled"
              disabled
            >
              {buttonText}
            </button>
          )}
          {hasAlternativeButton && (
            <button
              type="button"
              className="form__alternative-button"
              onClick={alternativeButtonClick}
            >
              {alternativeButtonText}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ModalWithForm;
