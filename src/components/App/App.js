import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import {getWeatherInfo} from '../../utils/weatherApi';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext';

function App() {
  const [weather, setWeather] = useState({});
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  useEffect(() => {
    getWeatherInfo()
      .then((res) => {
        const weatherData = res;
        weatherData.temperature.F = `${Math.round(res.main.temp)}°F`;
        weatherData.temperature.C = `${Math.round((res.main.temp - 32) * 5/9)}°C`;
        setWeather(weatherData);
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
    <div className="app">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <Header location={weather.location} onClickAdd={handleOpenGarmentForm} />
        <Main weatherId={weather.current.weather.id} temperature={`weather.temperature[${currentTemperatureUnit}]`} sunrise={weather.current.sunrise} sunset={weather.current.sunset} onSelectCard={handleSelectedCard}/>
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
  );
}

export default App;
