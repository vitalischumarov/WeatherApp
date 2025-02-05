import "./style.scss";
import { fetchWeatherData } from "./fetchData";

let cityName = "Bielefeld";
let forcastDays = 3;
// https://www.weatherapi.com/docs/#
const WEATHER_API = `http://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=${cityName}&lang=DE&days=${forcastDays}`;

const cityNameEl = document.querySelector(".city");
const weatherEl = document.querySelector(".weather");
const conditionEl = document.querySelector(".condition");
const forcastEl = document.querySelector(".forcast");

// Hier werden alle wichtigen Funktionen aufgerufen, wenn die App startet
let data = await fetchWeatherData(WEATHER_API);
displayCityInformation(data);
displayForcastInformationText(data);
displayAllForeCast(data);
getCurrentTime();

function displayCityInformation(city) {
  cityNameEl.innerHTML = city.location.name;
  weatherEl.innerHTML = `${city.current.temp_c}°`;
  conditionEl.innerHTML = city.current.condition.text;
  forcastEl.innerHTML = `H: ${city.forecast.forecastday[0].day.maxtemp_c} L: ${city.forecast.forecastday[0].day.mintemp_c}`;
}

function displayForcastInformationText(city) {
  const forcastTextEl = document.querySelector(".forecastWeather__text");
  forcastTextEl.innerHTML = `Heute ${city.forecast.forecastday[0].day.condition.text}. Wind bis zu ${city.forecast.forecastday[0].day.maxwind_kph} km/h`;
}

function createSingleForcastBlock(time, image, temp) {
  const forcastData = document.createElement("div");
  forcastData.classList.add("forecastData");
  const forecastData__time = document.createElement("div");
  forecastData__time.classList.add("forecastData__time");
  forecastData__time.classList.add("text");
  const forecastData__time_node = document.createTextNode(time);
  const forecastData__image = document.createElement("div");
  forecastData__time.classList.add("forecastData__image");
  const img = document.createElement("img");
  forecastData__time.classList.add("img");
  img.setAttribute("src", image);
  const forecastData__temp = document.createElement("div");
  forecastData__temp.classList.add("forecastData__temp");
  forecastData__temp.classList.add("text");
  const forecastData__temp_node = document.createTextNode(temp);

  forcastData.appendChild(forecastData__time);
  forcastData.appendChild(forecastData__image);
  forcastData.appendChild(forecastData__temp);
  forecastData__time.appendChild(forecastData__time_node);
  forecastData__image.appendChild(img);
  forecastData__temp.appendChild(forecastData__temp_node);

  displayForecast(forcastData);
}

function displayForecast(forecastBlock) {
  document.querySelector(".allForcasts").appendChild(forecastBlock);
}

function displayAllForeCast(forecastDate) {
  let nextHour = getCurrentTime();
  let selectedDay = 0;
  for (let i = 0; i <= 23; i++) {
    console.log(i);
    console.log(selectedDay);
    createSingleForcastBlock(
      renderForecastTime(
        forecastDate.forecast.forecastday[0].hour[nextHour].time,
      ),
      forecastDate.forecast.forecastday[selectedDay].hour[nextHour].condition
        .icon,
      forecastDate.forecast.forecastday[selectedDay].hour[nextHour].temp_c,
    );
    nextHour = nextHour + 1;
    if (nextHour > 23) {
      nextHour = 0;
      selectedDay = 1;
    }
  }
}

function getCurrentTime() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  return hour + 1;
}

function renderForecastTime(time) {
  return time.split(" ")[1];
}
