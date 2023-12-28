import React from 'react';
import './ItemModal.css';
import '../Modal.css';

function ItemModal({onClose, onDelete, link, name, weather}){
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
          <div className="item-modal__content">
            <div className="item-modal__info-wrapper">
              <p className="item-modal__text">{name}</p>
              <p className="item-modal__text">Weather: {weather}</p>
            </div>
            <button onClick={onDelete} type="button" className="item-modal__delete">Delete item</button>
          </div>
        </div>
    </section>
  )
}

export default ItemModal;