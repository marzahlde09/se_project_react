import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeatherInfo } from "../../utils/weatherApi";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [currentWeather, setCurrentWeather] = useState({
    location: "",
    weatherId: 800,
    temperature: { F: 0, C: 0 },
    sunrise: 0,
    sunset: 0,
  });
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  //check for token and load in user data if the token is valid
  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  //load in weather data once when the website is accessed
  useEffect(() => {
    getWeatherInfo()
      .then((res) => {
        setCurrentWeather({
          location: res.name,
          weatherId: res.weather[0].id,
          temperature: {
            F: Math.round(res.main.temp),
            C: Math.round(((res.main.temp - 32) * 5) / 9),
          },
          sunrise: res.sys.sunrise,
          sunset: res.sys.sunset,
        });
      })
      .catch(console.error);
  }, []);

  //load in initial clothing items from the server
  useEffect(() => {
    api.getItems()
      .then((res) => {
        setClothingItems(res.data);
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

  const handleOpenLoginForm = () => {
    setOpenModal("login");
  };

  const handleOpenRegisterForm = () => {
    setOpenModal("register");
  };

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setOpenModal("item");
  };

  const openConfirmationModal = () => {
    setOpenModal("confirm");
  };

  const handleOpenEditProfileForm = () => {
    setOpenModal("edit-profile");
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
      return api.addItem(data, localStorage.getItem("jwt")).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardDelete = (id) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return api.deleteItem(id, token).then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
      });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfile = (data) => {
    const makeRequest = () => {
      return api.updateProfile(data, localStorage.getItem("jwt"))
        .then((res) => setCurrentUser(res.data)
      );
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    isLiked
      ? api.removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.error(err))
      : api.addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.error(err));
  };

  const handleTokenCheck = () => {
      return (localStorage.getItem("jwt") && auth
        .checkToken(localStorage.getItem("jwt"))
        .then((res) => {
          //add user data to the state
          setCurrentUser(res.data);
          setLoggedIn(true);
      })
        .catch((err) => console.error(err))
      )
  };

  const handleLogin = ({email, password}) => {
    return auth
      .authorize(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/profile");
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = ({name, avatar, email, password}) => {
    return auth.register(name, avatar, email, password)
      .then(() => {
        handleLogin({email, password})
      })
      .catch((err) => console.error(err));
  }

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            location={currentWeather.location}
            onClickAdd={handleOpenGarmentForm}
            onClickLogin={handleOpenLoginForm}
            onClickRegister={handleOpenRegisterForm}
            loggedIn={loggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weather={currentWeather}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
              />
            </Route>
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              onCheckAuth={handleTokenCheck}
            >
              <Profile
                onSelectCard={handleSelectedCard}
                onClickAdd={handleOpenGarmentForm}
                onClickEdit={handleOpenEditProfileForm}
                onClickLogout={handleLogout}
                clothingItems={clothingItems}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
              />
            </ProtectedRoute>
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
          {openModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              isLoading={isLoading}
              onRegister={handleRegister}
              onClickLogin={handleOpenLoginForm}
            />
          )}
          {openModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              isLoading={isLoading}
              handleLogin={handleLogin}
              onClickRegister={handleOpenRegisterForm}
            />
          )}
          {openModal === "edit-profile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              isLoading={isLoading}
              handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
