import React from 'react';
import './ItemModal.css';
import '../Modal.css';

function ItemModal({onClose, link, name, weather}){
  const handleOutsideClickClose = (e) => {
    if(e.target.classList.contains("modal")){
      onClose();
    }
  }

  return(
    <section className="modal modal_type_item" onClick={handleOutsideClickClose}>
        <div className="item-modal">
          <button onClick={onClose} type="button" className="item-modal__close-button"></button>
          <img className="item-modal__image" src={link} alt={name} />
          <div className="item-modal__text-wrapper">
            <p className="item-modal__text">{name}</p>
            <p className="item-modal__text">Weather: {weather}</p>
          </div>
        </div>
    </section>
  )
}

export default ItemModal;