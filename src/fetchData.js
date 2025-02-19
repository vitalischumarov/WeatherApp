import { showLoadingScreen, deleteLoadingScreen } from "./loadingScreen";

const WEATHER_API_1 =
  "http://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=";
const WEATHER_API_2 = "&lang=DE&days=3";

export async function fetchWeatherData(city) {
  showLoadingScreen();
  let response = await fetch(WEATHER_API_1 + city + WEATHER_API_2);
  if (!response.status) {
    return;
  }
  let data = await response.json();
  deleteLoadingScreen();
  return data;
}

export async function fetchCityNames(url) {
  let response = await fetch(url);
  if (!response.status) {
    return;
  }
  let data = await response.json();
  return data;
}
