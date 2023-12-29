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
  temperature,
  weatherId,
  sunrise,
  sunset,
  onSelectCard,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [weather, setWeather] = useState("");
  useEffect(() => {
    if (currentTemperatureUnit === "F") {
      if (temperature >= fahrenheitThreshholds.hot) {
        setWeather("hot");
      } else if (temperature >= fahrenheitThreshholds.warm) {
        setWeather("warm");
      } else {
        setWeather("cold");
      }
    } else {
      if (temperature >= celsiusThreshholds.hot) {
        setWeather("hot");
      } else if (temperature >= celsiusThreshholds.warm) {
        setWeather("warm");
      } else {
        setWeather("cold");
      }
    }
  }, [currentTemperatureUnit]);

  return (
    <main className="main app__main">
      <WeatherCard
        weatherId={weatherId}
        temperature={temperature}
        sunrise={sunrise}
        sunset={sunset}
      />
      <section className="main__cards-wrapper">
        <p className="main__section-heading">
          Today is {temperature}° {currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="main__cards">
          {clothingItems.map(
            (item) =>
              item.weather === weather && (
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
