import React from 'react';
import './Main.css';
import '../App/App.css';
import WeatherCard from '../WeatherCard/WeatherCard';

function Main(props){
  return(
    <main className="main app__main">
      <WeatherCard weatherId={props.weatherId} temperature={props.temperature} sunrise={props.sunrise} sunset={props.sunset} />
    </main>
  )
}

export default Main;