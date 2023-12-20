import React, {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import {getWeatherInfo} from '../../utils/weatherApi';

function App() {
  const [location, setLocation] = useState("New York");
  const [weatherId, setWeatherId] = useState(800);
  const [temperature, setTemperature] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

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

  return (
    <div className="app">
      <Header location={location}/>
      <Main weatherId={weatherId} temperature={temperature} sunrise={sunrise} sunset={sunset}/>
    </div>
  );
}

export default App;
