import React from "react";
import "./DeleteConfirmationModal.css";
import "../Modal.css";

function DeleteConfirmationModal({
  onClose,
  onConfirm,
  selectedCard,
  isLoading,
}) {

  return (
    <section
      className="modal modal_type_confirm"
    >
      <div className="delete-confirmation-modal">
        <button
          onClick={onClose}
          type="button"
          className="delete-confirmation-modal__close-button"
        ></button>
        <p className="delete-confirmation-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button
          onClick={() => onConfirm(selectedCard._id)}
          type="button"
          className="delete-confirmation-modal__confirm-button"
        >
          {isLoading ? "Saving..." : "Yes, delete item"}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="delete-confirmation-modal__cancel-button"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}

export default DeleteConfirmationModal;
