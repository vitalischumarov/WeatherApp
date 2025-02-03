import "./style.scss";
import { fetchWeatherData } from "./fetchData";

let cityName = "Einsiedeln";
let forcastDays = 3;
// https://www.weatherapi.com/docs/#
const WEATHER_API = `http://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=${cityName}&lang=DE&days=${forcastDays}`;

const cityNameEl = document.querySelector(".city");
const weatherEl = document.querySelector(".weather");
const conditionEl = document.querySelector(".condition");
const forcastEl = document.querySelector(".forcast");

let data = await fetchWeatherData(WEATHER_API);

function displayCityInformation(city) {
  cityNameEl.innerHTML = city.location.name;
  weatherEl.innerHTML = `${city.current.temp_c}°`;
  conditionEl.innerHTML = city.current.condition.text;
  forcastEl.innerHTML = `H: ${city.forecast.forecastday[0].day.maxtemp_c} L: ${city.forecast.forecastday[0].day.mintemp_c}`;
}

displayCityInformation(data);
