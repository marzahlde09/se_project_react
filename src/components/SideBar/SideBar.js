import React from 'react';
import './SideBar.css';
import avatar from '../../images/avatar.png';

function SideBar(){
  return(
    <div className="side-bar">
      <img className="side-bar__avatar" src={avatar} alt="User avatar"/>
      <p className="side-bar__name">Terrence Tegegne</p>
    </div>
  )
}

export default SideBar;