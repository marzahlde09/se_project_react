import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onClickEdit, onClickLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="side-bar">
      <div className="side-bar__profile-wrapper">
        <img
          className="side-bar__avatar"
          src={currentUser.avatar}
          alt="User avatar"
        />
        <p className="side-bar__name">{currentUser.name}</p>
      </div>
      <div className="side-bar__button-wrapper">
        <button
          type="button"
          className="side-bar__button"
          onClick={onClickEdit}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="side-bar__button"
          onClick={onClickLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
