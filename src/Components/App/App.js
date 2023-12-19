import React, {useState, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import {getWeatherInfo} from '../../utils/weatherApi';

function App() {
  const [location, setLocation] = useState("New York");

  useEffect(() => {
    getWeatherInfo()
      .then((res) => setLocation(res.name))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <Header location={location}/>
    </div>
  );
}

export default App;
