import React from 'react';
import './WeatherCard.css';

function WeatherCard(props){
  const currentTime = Math.floor(Date.now() / 1000);
  let timeOfDay;
  currentTime > props.sunrise && currentTime < props.sunset ? timeOfDay = "day" : timeOfDay = "night";
  let weather;
  switch(true){
    case 701 <= props.weatherId && props.weatherId <= 781:
      weather = "fog";
      break;
    case props.weatherId > 800:
      weather = "cloudy";
      break;
    case 600 <= props.weatherId && props.weatherId <= 622:
      weather = "snow";
      break;
    case (500 <= props.weatherId && props.weatherId <= 531) || (300 <= props.weatherId && props.weatherId <= 321):
      weather = "rain";
      break;
    case 200 <= props.weatherId && props.weatherId <= 232:
      weather = "storm";
      break;
    default:
      weather = "sunny";
  }

  return(
    <div className={"weather-card weather-card_type_" + weather + "-" + timeOfDay}>
      <p className="weather-card__temperature">{props.temperature}°F</p>
    </div>
  )
}

export default WeatherCard;