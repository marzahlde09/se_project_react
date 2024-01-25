import React from "react";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";
import { Link } from "react-router-dom";


function Header({ location, onClickAdd, onClickLogin, onClickRegister, loggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);
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
      {loggedIn ?
        <div className="header__wrapper">
          <ToggleSwitch />
          <button
            type="button"
            className="header__button"
            onClick={onClickRegister}
          >
            Sign Up
          </button>
          <button type="button" className="header__button" onClick={onClickLogin}>
            Log In
          </button>
        </div> :
        <div className="header__wrapper">
          <ToggleSwitch />
          <button type="button" className="header__button" onClick={onClickAdd}>
            + Add clothes
          </button>
          <p className="header__name">{currentUser.name}</p>
          <Link to="/se_project_react/profile">
            <img className="header__avatar" src={currentUser.avatar} alt="User avatar" />
          </Link>
        </div>
      }
    </header>
  );
}

export default Header;
