import React from 'react';
import './Profile.css';
import '../App/App.css';
import avatar from '../../images/avatar.png';
import ItemCard from '../ItemCard/ItemCard';
import {defaultClothingItems} from '../../utils/constants';

function Profile({onSelectCard, onClickAdd}){

  return(
    <section className="profile app__profile">
      <div className="profile__info">
        <img className="profile__avatar" src={avatar} alt="User avatar"/>
        <p className="profile__name">Terrence Tegegne</p>
      </div>
      <div className="profile__cards-wrapper">
        <div className="profile__section-heading">
          <p className="profile__cards-title">Your items</p>
          <button type="button" className="profile__add-button" onClick={onClickAdd}>+ Add new</button>
        </div>
        <ul className="profile__cards">
          {defaultClothingItems.map((item) =>
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard}/>
          )}
        </ul>
      </div>
    </section>
  )
}

export default Profile;