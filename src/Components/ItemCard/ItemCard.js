import React from 'react';
import './ItemCard.css';

function ItemCard(props){
  return(
    <div className="item-card">
      <img src={props.link} alt={props.name} className="item-card__picture"/>
      <p className="item-card__name">{props.name}</p>
    </div>
  )
}

export default ItemCard;