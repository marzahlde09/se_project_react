import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
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
  const [clothingItems, setClothingItems] = useState([]);

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

  const openConfirmationModal = () => {
    setOpenModal("confirm");
  }

  const handleCardDelete = () => {

  }

  const handleEscClose = useCallback((e) => {
    if (e.key === "Escape") {
          handleCloseModal();
      }
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F' ? setCurrentTemperatureUnit('C') : setCurrentTemperatureUnit('F');
  }

  const handleAddItemSubmit = ({name, link, weather}) => {
    setClothingItems([{id: clothingItems.length, name: name, link: link, weather: weather}, ...clothingItems]);
    handleCloseModal();
  }

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
          <Header location={location} onClickAdd={handleOpenGarmentForm} />
          <Switch>
            <Route exact path = "/">
              <Main weatherId={weatherId} temperature={temperature[`${currentTemperatureUnit}`]} sunrise={sunrise} sunset={sunset} onSelectCard={handleSelectedCard} clothingItems={clothingItems}/>
            </Route>
            <Route path="/profile">
              <Profile onSelectCard={handleSelectedCard} onClickAdd={handleOpenGarmentForm} clothingItems={clothingItems}/>
            </Route>
          </Switch>
          <Footer />
          {
            openModal === "garment-form" &&
            <AddItemModal onClose={handleCloseModal} onAddItem={handleAddItemSubmit} />
          }
          {
            openModal === "item" &&
            <ItemModal link={selectedCard.link} name={selectedCard.name} weather={selectedCard.weather} onClose={handleCloseModal} onDelete={openConfirmationModal}/>
          }
          {
            openModal === "confirm" &&
            <DeleteConfirmationModal onClose={handleCloseModal} onConfirm={handleCardDelete}/>
          }
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
