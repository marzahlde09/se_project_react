import React from 'react';
import './ModalWithForm.css';
import '../Modal.css';

function ModalWithForm(props){
  const handleOutsideClickClose = (e) => {
    if(e.target.classList.contains("modal")){
      props.onClose();
    }
  }

  return(
    <section className={`modal modal_type_${props.name}`} onClick={handleOutsideClickClose}>
      <form name={`${props.name}`} className="form modal__form">
        <button onClick={props.onClose} type="button" className="form__close-button"></button>
        <p className="form__title">{props.title}</p>
        {props.children}
        <button type="submit" className="form__submit">{props.buttonText}</button>
      </form>
    </section>
  )
}

export default ModalWithForm;