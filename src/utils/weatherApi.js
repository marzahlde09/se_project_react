import {latitude, longitude, apiKey as APIkey} from "./constants";

export function getWeatherInfo(){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}` )
    .then(processServerResponse);
}

const processServerResponse = (res) => {
  if(res.ok){
    return res.json();
  }
  else{
    return Promise.reject(`Error: ${res.status}`);
  }
}

//API Key
//153d890daf5a4aed5da8e02043642994