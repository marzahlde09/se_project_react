import React from 'react';
import './Main.css';
import '../App/App.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import {defaultClothingItems} from '../../utils/constants';

function Main(props){
  const temperature = () => {
    if(props.temperature >= 86){
      return 'hot';
    }
    else if(props.temperature >= 66 && props.temperature <= 85){
      return 'warm';
    }
    else{
      return 'cold';
    }
  }
  return(
    <main className="main app__main">
      <WeatherCard weatherId={props.weatherId} temperature={props.temperature} sunrise={props.sunrise} sunset={props.sunset} />
      <section className="main__cards-wrapper">
        <p className="main__section-heading">Today is {props.temperature}° F / You may want to wear:</p>
        <ul className="main__cards">
          {defaultClothingItems.map((item) =>
            item.weather === temperature() &&
            <ItemCard key={item._id} item={item} onSelectCard={props.onSelectCard}/>
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;