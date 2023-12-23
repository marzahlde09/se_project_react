import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import {getWeatherInfo} from '../../utils/weatherApi';

function App() {
  const [location, setLocation] = useState("New York");
  const [weatherId, setWeatherId] = useState(800);
  const [temperature, setTemperature] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    getWeatherInfo()
      .then((res) => {
        setLocation(res.name);
        setWeatherId(res.weather[0].id);
        setTemperature(Math.floor(res.main.temp));
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

  return (
    <div className="app">
      <Header location={location} onClickAdd={handleOpenGarmentForm} />
      <Main weatherId={weatherId} temperature={temperature} sunrise={sunrise} sunset={sunset} onSelectCard={handleSelectedCard}/>
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
    </div>
  );
}

export default App;
