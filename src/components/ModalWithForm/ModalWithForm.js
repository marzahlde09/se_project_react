import React from 'react';
import './ModalWithForm.css';
import '../Modal.css';

function ModalWithForm({onClose, name, title, buttonText, children, onAddItem}){
  const handleOutsideClickClose = (e) => {
    if(e.target.classList.contains("modal")){
      onClose();
    }
  }

  return(
    <section className={`modal modal_type_${name}`} onClick={handleOutsideClickClose}>
      <form name={`${name}`} className="form modal__form" onSubmit={onAddItem}>
        <button onClick={onClose} type="button" className="form__close-button"></button>
        <p className="form__title">{title}</p>
        {children}
        <button type="submit" className="form__submit">{buttonText}</button>
      </form>
    </section>
  )
}

export default ModalWithForm;