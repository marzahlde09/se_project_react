import React from 'react';
import './ItemCard.css';

function ItemCard(props){
  return(
    <div className="item-card" onClick={() => props.onSelectCard(props.item)}>
      <img src={props.item.link} alt={props.item.name} className="item-card__picture"/>
      <p className="item-card__name">{props.item.name}</p>
    </div>
  )
}

export default ItemCard;