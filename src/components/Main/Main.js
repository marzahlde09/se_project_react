import React, { useContext } from "react";
import "./Main.css";
import "../App/App.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  temperature,
  weatherId,
  sunrise,
  sunset,
  onSelectCard,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const getWeather = () => {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66 && temperature <= 85) {
      return "warm";
    } else {
      return "cold";
    }
  };
  const weather = getWeather();

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
