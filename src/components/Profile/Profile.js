import React from 'react';
import './Profile.css';
import '../App/App.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({onSelectCard, onClickAdd}){

  return(
    <section className="profile app__profile">
      <SideBar />
      <ClothesSection onSelectCard={onSelectCard} onClickAdd={onClickAdd} />
    </section>
  )
}

export default Profile;