import "./secondView.scss";
import { fetchWeatherData } from "./fetchData";
import {
  getConditionCode,
  dayOrNight,
  getCurrentHour,
} from "./excludedFunction";
import { getConditionImagePath } from "./conditions";
import { loadCitiesFromLocalStorage } from "./localStorage";
// import { cityName } from "./main";
//

let testCities = loadCitiesFromLocalStorage();
const editEl = document.querySelector(".header__button");
let editCitiesActive = false;

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
        <div class="deleteBox ${name}"> delete </div>
        <div class="rightBox" id="${name}" style="background-image: url(${img})">
          <div class="favorite__description">
            <span class="text city">${name}</span>
              <span class="text">${country}</span>
              <br />
              <span class="text">${condition}</span>
          </div>
          <div class="favorite__values">
              <span class="text temperature">${temp}°</span>
              <br />
              <span class="text">H:${maxTemp} T:${minTemp}</span>
          </div>
        </div>`;
  const favorite = document.createElement("div");
  favorite.classList.add("favorite");
  favorite.innerHTML = city;
  const favoriteList = document.querySelector(".favoriteList");
  favoriteList.appendChild(favorite);
  document.getElementById(name).addEventListener("click", function () {
    goToDetailView(name);
  });
  document.querySelector(`.${name}`).addEventListener("click", function () {
    deleteFavoriteCity(name);
  });
}

function goToDetailView(name) {
  console.log(name);
  saveToLocalStorage(name);
  window.location.href = "./index.html";
}

function saveToLocalStorage(name) {
  localStorage.setItem("nameOfCity", name);
  console.log("saved");
}

editEl.addEventListener("click", () => {
  if (editCitiesActive) {
    const allBoxes = document.querySelectorAll(".deleteBox");
    allBoxes.forEach((box) => {
      box.style.display = "none";
      editCitiesActive = false;
    });
  } else {
    const allBoxes = document.querySelectorAll(".deleteBox");
    allBoxes.forEach((box) => {
      box.style.display = "flex";
      editCitiesActive = true;
    });
  }
});

function deleteFavoriteCity(cityName) {
  for (let i = 0; i < testCities.length; i++) {
    if (cityName === testCities[i]) {
      testCities.splice(i, 1);
    }
  }
  console.log(`es wurde ${cityName}. Array jetzt: ${testCities}.`);
  deleteCurrentView();
  loadFavorietCities(testCities);
  editCitiesActive = false;
}

function deleteCurrentView() {
  let allItems = document.querySelectorAll(".favorite");
  allItems.forEach((item) => {
    item.remove();
  });
}
