import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import "../App/App.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  fahrenheitThreshholds,
  celsiusThreshholds,
} from "../../utils/constants";

function Main({
  weather,
  onSelectCard,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [temperature, setTemperature] = useState(0);
  const [weatherType, setWeatherType] = useState("");
  useEffect(() => {
    setTemperature(weather.temperature[`${currentTemperatureUnit}`]);
    if (currentTemperatureUnit === "F") {
      if (temperature >= fahrenheitThreshholds.hot) {
        setWeatherType("hot");
      } else if (temperature >= fahrenheitThreshholds.warm) {
        setWeatherType("warm");
      } else {
        setWeatherType("cold");
      }
    } else {
      if (temperature >= celsiusThreshholds.hot) {
        setWeatherType("hot");
      } else if (temperature >= celsiusThreshholds.warm) {
        setWeatherType("warm");
      } else {
        setWeatherType("cold");
      }
    }
  }, [currentTemperatureUnit]);

  return (
    <main className="main app__main">
      <WeatherCard
        weatherId={weather.weatherId}
        temperature={temperature}
        sunrise={weather.sunrise}
        sunset={weather.sunset}
      />
      <section className="main__cards-wrapper">
        <p className="main__section-heading">
          Today is {temperature}° {currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="main__cards">
          {clothingItems.map(
            (item) =>
              item.weather === weatherType && (
                <ItemCard
                  key={item._id}
                  item={item}
                  onSelectCard={onSelectCard}
                />
              )
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
