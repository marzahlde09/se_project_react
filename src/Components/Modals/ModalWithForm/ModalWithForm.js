import React, {useEffect} from 'react';
import './ModalWithForm.css';
import '../Modal.css';

function ModalWithForm(props){
  return(
    <section className={`modal modal_type_${props.name}`}>
      <form name={`${props.name}`} className="form modal__form">
        <button onClick={props.onClose} type="button" className="modal__close-button"></button>
        <p className="form__title">{props.title}</p>
        {props.children}
        <button type="submit" className="form__submit">{props.buttonText}</button>
      </form>
    </section>
  )
}

export default ModalWithForm;