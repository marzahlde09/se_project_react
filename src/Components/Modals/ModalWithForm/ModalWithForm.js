import React from 'react';
import './ModalWithForm.css';
import '../Modal.css';

function ModalWithForm(props){
  const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric' });
  return(
    <section className={`modal modal_type_${props.name}`}>
      <form name={`${props.name}`} className="form modal__form">
        <button type="button" className="modal__close-button"></button>
        <p className="form__title">{props.title}</p>
        {props.children}
        <button type="submit" className="form__submit">{props.buttonText}</button>
      </form>
    </section>
  )
}

export default Header;