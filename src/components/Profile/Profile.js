import React from "react";
import "./Profile.css";
import "../App/App.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onSelectCard,
  onClickAdd,
  onClickEdit,
  onClickLogout,
  clothingItems,
  onCardLike,
  loggedIn,
}) {
  return (
    <section className="profile app__profile">
      <SideBar onClickEdit={onClickEdit} onClickLogout={onClickLogout} />
      <ClothesSection
        onSelectCard={onSelectCard}
        onClickAdd={onClickAdd}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        loggedIn={loggedIn}
      />
    </section>
  );
}

export default Profile;
