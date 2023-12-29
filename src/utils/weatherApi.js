import { latitude, longitude, apiKey as APIkey } from "./constants";
import { request } from "./api";

export function getWeatherInfo() {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
}

//API Key
//153d890daf5a4aed5da8e02043642994
