import React, {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../Modals/ModalWithForm/ModalWithForm';
import {getWeatherInfo} from '../../utils/weatherApi';

function App() {
  const [location, setLocation] = useState("New York");
  const [weatherId, setWeatherId] = useState(800);
  const [temperature, setTemperature] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [openModal, setOpenModal] = useState("");

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
    window.removeEventListener("keydown", handleEscClose);
  }

  const handleOpenGarmentForm = () => {
    setOpenModal("garment-form");
    window.addEventListener("keydown", handleEscClose);
  }

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  }

  return (
    <div className="app">
      <Header location={location} onClickAdd={handleOpenGarmentForm} />
      <Main weatherId={weatherId} temperature={temperature} sunrise={sunrise} sunset={sunset}/>
      <Footer />
      {
        openModal === "garment-form" &&
        <ModalWithForm title="New garment" buttonText="Add garment" name="garment-form" onClose={handleCloseModal}>
          <p>Name</p>
          <input type="text" required="true" placeholder="Name"/>
          <p>Image</p>
          <input type="url" required="true" placeholder="Image URL"/>
          <p>Select the weather type:</p>
          <label>
            <input type="radio" id="hot" name="weather" value="Hot" />
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

    </div>
  );
}

export default App;
