import React from "react";
import "./ItemModal.css";
import "../Modal.css";

function ItemModal({ selectedCard, onClose, onDelete }) {
  return (
    <section
      className="modal modal_type_item"
    >
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
            className="item-modal__delete"
          >
            Delete item
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemModal;
