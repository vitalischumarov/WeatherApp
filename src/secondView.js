import "./secondView.scss";
import { fetchWeatherData } from "./fetchData";
import {
  getConditionCode,
  dayOrNight,
  getCurrentHour,
} from "./excludedFunction";
import { getConditionImagePath } from "./conditions";
// import { cityName } from "./main";

const testCities = ["Basel", "Kyoto", "Moskau"];

loadFavorietCities(testCities);

async function loadFavorietCities(city) {
  for (let i = 0; i < city.length; i++) {
    let data = await fetchWeatherData(testCities[i]);
    const currentHour = getCurrentHour(data);
    const isDay = dayOrNight(data, currentHour);
    const conditionCode = getConditionCode(data, currentHour);
    const imagePath = getConditionImagePath(conditionCode, isDay);
    displayCities(
      data.location.name,
      data.location.country,
      data.current.condition.text,
      data.current.temp_c,
      data.forecast.forecastday[0].day.maxtemp_c,
      data.forecast.forecastday[0].day.mintemp_c,
      imagePath,
    );
  }
}

function displayCities(name, country, condition, temp, maxTemp, minTemp, img) {
  let city = `
        <div class="favorite__description">
          <span class="text city">${name}</span>
            <span class="text">${country}</span>
            <br />
            <span class="text">${condition}</span>
        </div>
        <div class="favorite__values">
            <span class="text temperature">${temp}</span>
            <br />
            <span class="text">H:${maxTemp} T:${minTemp}</span>
        </div>`;
  const favorite = document.createElement("div");
  favorite.classList.add("favorite");
  favorite.style.backgroundImage = `url(${img})`;
  favorite.addEventListener("click", function () {
    goToDetailView(name);
  });
  favorite.innerHTML = city;

  const favoriteList = document.querySelector(".favoriteList");
  favoriteList.appendChild(favorite);
}

function goToDetailView(name) {
  saveToLocalStorage(name);
  window.location.href = "./index.html";
}

function saveToLocalStorage(name) {
  localStorage.setItem("nameOfCity", name);
  console.log("saved");
}
