import React from 'react';
import './Main.css';
import '../App/App.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import {defaultClothingItems} from '../../utils/constants';

function Main({temperature, weatherId, sunrise, sunset, onSelectCard}){
  const getWeather = () => {
    if(temperature >= 86){
      return 'hot';
    }
    else if(temperature >= 66 && temperature <= 85){
      return 'warm';
    }
    else{
      return 'cold';
    }
  }
  const weather = getWeather();
  return(
    <main className="main app__main">
      <WeatherCard weatherId={weatherId} temperature={temperature} sunrise={sunrise} sunset={sunset} />
      <section className="main__cards-wrapper">
        <p className="main__section-heading">Today is {temperature}° F / You may want to wear:</p>
        <ul className="main__cards">
          {defaultClothingItems.map((item) =>
            item.weather === weather &&
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard}/>
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;