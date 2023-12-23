import React from 'react';
import './ItemModal.css';
import '../Modal.css';

function ItemModal(props){
  const handleOutsideClickClose = (e) => {
    if(e.target.classList.contains("modal")){
      props.onClose();
    }
  }

  return(
    <section className={`modal modal_type_item`} onClick={handleOutsideClickClose}>
        <div className="item-modal">
          <button onClick={props.onClose} type="button" className="item-modal__close-button"></button>
          <img className="item-modal__image" src={props.link} alt={props.name} />
          <div className="item-modal__text-wrapper">
            <p className="item-modal__text">{props.name}</p>
            <p className="item-modal__text">Weather: {props.weather}</p>
          </div>
        </div>
    </section>
  )
}

export default ItemModal;