import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Profile from '../Profile/Profile';
import {getWeatherInfo} from '../../utils/weatherApi';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  const [location, setLocation] = useState('');
  const [weatherId, setWeatherId] = useState(800);
  const [temperature, setTemperature] = useState({F: 0, C: 0});
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  useEffect(() => {
    getWeatherInfo()
      .then((res) => {
        setLocation(res.name);
        setWeatherId(res.weather[0].id);
        setTemperature({F: Math.round(res.main.temp), C: Math.round((res.main.temp - 32) * 5/9)});
        setSunrise(res.sys.sunrise);
        setSunset(res.sys.sunset);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCloseModal = () => {
    setOpenModal("");
    setSelectedCard({});
    window.removeEventListener("keydown", handleEscClose);
  }

  const handleOpenGarmentForm = () => {
    setOpenModal("garment-form");
    window.addEventListener("keydown", handleEscClose);
  }

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setOpenModal("item");
    window.addEventListener("keydown", handleEscClose);
  }

  const handleEscClose = useCallback((e) => {
    if (e.key === "Escape") {
          handleCloseModal();
      }
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F' ? setCurrentTemperatureUnit('C') : setCurrentTemperatureUnit('F');
  }

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
          <Header location={location} onClickAdd={handleOpenGarmentForm} />
          <Switch>
            <Route exact path = "/">
              <Main weatherId={weatherId} temperature={temperature[`${currentTemperatureUnit}`]} sunrise={sunrise} sunset={sunset} onSelectCard={handleSelectedCard}/>
            </Route>
            <Route path="/profile">
              <Profile onSelectCard={handleSelectedCard} onClickAdd={handleOpenGarmentForm} />
            </Route>
          </Switch>
          <Footer />
          {
            openModal === "garment-form" &&
            <ModalWithForm title="New garment" buttonText="Add garment" name="garment-form" onClose={handleCloseModal}>
              <label for="name">Name*</label>
              <input type="text" required placeholder="Name" id="name"/>
              <label for="url">Image*</label>
              <input type="url" required placeholder="Image URL" id="url"/>
              <p>Select the weather type:</p>
              <label>
                <input type="radio" id="hot" name="weather" value="Hot" required/>
                Hot
              </label>
              <label>
                <input type="radio" id="warm" name="weather" value="Warm" />
                Warm
              </label>
              <label>
                <input type="radio" id="cold" name="weather" value="Cold" />
                Cold
              </label>
            </ModalWithForm>
          }
          {
            openModal === "item" &&
            <ItemModal link={selectedCard.link} name={selectedCard.name} weather={selectedCard.weather} onClose={handleCloseModal}/>
          }
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
