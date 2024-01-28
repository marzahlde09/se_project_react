import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ onSelectCard, item, loggedIn, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);
  console.log(isLiked);
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked && "item-card__like-button_liked"
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleClick = () => {
    onSelectCard(item);
  };

  return (
    <div className="item-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__picture"
        onClick={handleClick}
      />
      <div className="item-card__content-wrapper">
        <p className="item-card__name">{item.name}</p>
        {loggedIn && (
          <button
            type="button"
            onClick={handleLike}
            className={itemLikeButtonClassName}
          ></button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
