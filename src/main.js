import "./style.scss";
import { fetchWeatherData } from "./fetchData";

let cityName = "Kiel";
// https://www.weatherapi.com/docs/#
const WEATHER_API = `http://api.weatherapi.com/v1/current.json?key=4d9509708acc49a6a8740155253101&q=${cityName}&lang=DE`;

const cityNameEl = document.querySelector(".city");
const weatherEl = document.querySelector(".weather");
const conditionEl = document.querySelector(".condition");

let data = await fetchWeatherData(WEATHER_API);

function displayCityInformation(city) {
  cityNameEl.innerHTML = city.location.name;
  weatherEl.innerHTML = `${city.current.temp_c}°`;
  conditionEl.innerHTML = city.current.condition.text;
}

displayCityInformation(data);
