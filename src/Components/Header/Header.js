import React from 'react';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.png';
import './Header.css';

function Header(){
  return(
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
        <p className="header__date-location"></p>
      </div>
      <div className="header__wrapper">
        <button type="button" className="header__add-button">+ Add clothes</button>
        <p className="header__name">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="User avatar"/>
      </div>
    </header>
  )
}

export default Header;