import React from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import {defaultClothingItems} from '../../utils/constants';

function ClothesSection({onSelectCard, onClickAdd}){

  return(
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p className="clothes-section__title">Your items</p>
        <button type="button" className="clothes-section__add-button" onClick={onClickAdd}>+ Add new</button>
      </div>
      <ul className="clothes-section__cards">
        {defaultClothingItems.map((item) =>
          <ItemCard key={item._id} item={item} onSelectCard={onSelectCard}/>
        )}
      </ul>
    </div>
  )
}

export default ClothesSection;