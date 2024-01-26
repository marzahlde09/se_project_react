import React, { useContext } from "react";
import "./ItemModal.css";
import "../Modal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ selectedCard, onClose, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner._id === currentUser._id;
  const itemDeleteButtonClassName = `item-modal__delete ${
    isOwn ? "item-modal__delete_visible" : "item-modal__delete_hidden"
  }`;

  return (
    <section className="modal modal_type_item">
      <div className="item-modal">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close-button"
        ></button>
        <img
          className="item-modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="item-modal__content">
          <div className="item-modal__info-wrapper">
            <p className="item-modal__text">{selectedCard.name}</p>
            <p className="item-modal__text">Weather: {selectedCard.weather}</p>
          </div>
          <button
            onClick={onDelete}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemModal;
