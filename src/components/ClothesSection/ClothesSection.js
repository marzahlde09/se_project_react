import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onSelectCard, onClickAdd, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add-button"
          onClick={onClickAdd}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map(
          (item) =>
            currentUser._id === item.owner._id && (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={onSelectCard}
              />
            )
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
