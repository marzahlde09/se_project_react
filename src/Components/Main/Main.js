import React from 'react';
import './Main.css';
import '../App/App.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import {defaultClothingItems} from '../../utils/constants';

function Main(props){
  const itemCards = defaultClothingItems.map((item) =>
    <ItemCard key={item._id} name={item.name} weather={item.weather} link={item.link} />
  );
  return(
    <main className="main app__main">
      <WeatherCard weatherId={props.weatherId} temperature={props.temperature} sunrise={props.sunrise} sunset={props.sunset} />
      <section className="main__cards-wrapper">
        <p className="main__section-heading">Today is {props.temperature}° F / You may want to wear:</p>
        <ul className="main__cards">
          {itemCards}
        </ul>
      </section>
    </main>
  )
}

export default Main;