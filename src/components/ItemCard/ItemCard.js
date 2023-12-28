import React from "react";
import "./ItemCard.css";

function ItemCard({ onSelectCard, item }) {
  return (
    <div className="item-card" onClick={() => onSelectCard(item)}>
      <img src={item.imageUrl} alt={item.name} className="item-card__picture" />
      <p className="item-card__name">{item.name}</p>
    </div>
  );
}

export default ItemCard;
