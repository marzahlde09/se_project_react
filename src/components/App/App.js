import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { getWeatherInfo } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [location, setLocation] = useState("");
  const [weatherId, setWeatherId] = useState(800);
  const [temperature, setTemperature] = useState({ F: 0, C: 0 });
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //load in weather data once when the website is accessed
  useEffect(() => {
    getWeatherInfo()
      .then((res) => {
        setLocation(res.name);
        setWeatherId(res.weather[0].id);
        setTemperature({
          F: Math.round(res.main.temp),
          C: Math.round(((res.main.temp - 32) * 5) / 9),
        });
        setSunrise(res.sys.sunrise);
        setSunset(res.sys.sunset);
      })
      .catch(console.error);
  }, []);

  //load in initial clothing items from the server
  useEffect(() => {
    getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => console.error(err));
  }, []);

  //add and remove the escape event listener when modals are opened
  useEffect(() => {
    if (!openModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleOutsideClickClose = (e) => {
      if (e.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOutsideClickClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOutsideClickClose);
    };
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal("");
    setSelectedCard({});
  };

  const handleOpenGarmentForm = () => {
    setOpenModal("garment-form");
  };

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setOpenModal("item");
  };

  const openConfirmationModal = () => {
    setOpenModal("confirm");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddItemSubmit = (data) => {
    const makeRequest = () => {
      return addItem(data).then((res) => {
        setClothingItems([res, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardDelete = (id) => {
    const makeRequest = () => {
      return deleteItem(id).then((res) => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
      });
    };
    handleSubmit(makeRequest);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header location={location} onClickAdd={handleOpenGarmentForm} />
          <Switch>
            <Route exact path="/se_project_react/">
              <Main
                weatherId={weatherId}
                temperature={temperature[`${currentTemperatureUnit}`]}
                sunrise={sunrise}
                sunset={sunset}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/se_project_react/profile">
              <Profile
                onSelectCard={handleSelectedCard}
                onClickAdd={handleOpenGarmentForm}
                clothingItems={clothingItems}
              />
            </Route>
          </Switch>
          <Footer />
          {openModal === "garment-form" && (
            <AddItemModal
              onClose={handleCloseModal}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
            />
          )}
          {openModal === "item" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDelete={openConfirmationModal}
            />
          )}
          {openModal === "confirm" && (
            <DeleteConfirmationModal
              onClose={handleCloseModal}
              onConfirm={handleCardDelete}
              selectedCard={selectedCard}
              isLoading={isLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
