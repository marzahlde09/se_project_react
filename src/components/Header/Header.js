import React from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ location, onClickAdd, onClickLogin }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/se_project_react/">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>
      <div className="header__wrapper">
        <ToggleSwitch />
        <button type="button" className="header__button" onClick={onClickAdd}>
          + Add clothes
        </button>
        <button type="button" className="header__button" onClick={onClickLogin}>
          Log In
        </button>
        <p className="header__name">Terrence Tegegne</p>
        <Link to="/se_project_react/profile">
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
