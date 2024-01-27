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
}) {
  return (
    <section className="profile app__profile">
      <SideBar onClickEdit={onClickEdit} onClickLogout={onClickLogout} />
      <ClothesSection
        onSelectCard={onSelectCard}
        onClickAdd={onClickAdd}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
