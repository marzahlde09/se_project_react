import React from 'react';
import './WeatherCard.css';

function WeatherCard({sunrise, sunset, weatherId, temperature}){
  const currentTime = Math.floor(Date.now() / 1000);
  const getTimeOfDay = () => {
    if(currentTime > sunrise && currentTime < sunset){
      return "day";
    } else{
    return "night";
    }
  }
  const getWeather = () => {
    if(701 <= weatherId && weatherId <= 781){
      return "fog";
    } else if(weatherId > 800){
      return "cloudy";
    } else if(600 <= weatherId && weatherId <= 622){
      return "snow";
    } else if((500 <= weatherId && weatherId <= 531) || (300 <= weatherId && weatherId <= 321)){
      return "rain";
    } else if(200 <= weatherId && weatherId <= 232){
      return "storm";
    } else{
      return "sunny";
    }
  }
  const timeOfDay = getTimeOfDay();
  const weather = getWeather();

  return(
    <div className={`weather-card weather-card_type_${weather}-${timeOfDay}`}>
      <p className="weather-card__temperature">{temperature}°F</p>
    </div>
  )
}

export default WeatherCard;