import "./secondView.scss";
import { fetchWeatherData, fetchCityNames } from "./fetchData";
import {
  getConditionCode,
  dayOrNight,
  getCurrentHour,
} from "./excludedFunction";
import { getConditionImagePath } from "./conditions";
import { loadCitiesFromLocalStorage, updateFavoriteList } from "./localStorage";

let testCities = loadCitiesFromLocalStorage();
const editEl = document.querySelector(".header__button");
let editCitiesActive = false;
let timeSinceTyped;

checkCities();

function checkCities() {
  if (testCities.length < 1) {
    document.querySelector(".favoriteList").innerHTML = "keine favoriten";
  } else {
  }
  loadFavorietCities(testCities);
}

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
        <div class="deleteBox ${name}"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="deleteBox__icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
 </div>
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
      console.log(`neue Liste: ${testCities}`);
      updateFavoriteList(testCities);
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

document
  .querySelector(".inputField__element")
  .addEventListener("input", async () => {
    clearTimeout(timeSinceTyped);
    timeSinceTyped = setTimeout(async function () {
      const result = await fetchCityNames(
        `http://api.weatherapi.com/v1/search.json?q=${document.querySelector(".inputField__element").value}&key=4d9509708acc49a6a8740155253101`,
      );
      displayPossibleCities(result);
    }, 2000);
  });

function displayPossibleCities(listOfCities) {
  const currentList = document.querySelectorAll(".predictions__city");
  currentList.forEach((element) => {
    element.remove();
  });
  for (let i = 0; i < listOfCities.length; i++) {
    createUI(listOfCities[i].name, listOfCities[i].country);
  }
}

function createUI(city, country) {
  const predictions__city = document.createElement("div");
  predictions__city.classList.add("predictions__city");
  const cityName = document.createElement("span");
  const cityNameText = document.createTextNode(city);
  cityName.appendChild(cityNameText);
  const countryName = document.createElement("span");
  const countryNameText = document.createTextNode(country);
  countryName.appendChild(countryNameText);
  predictions__city.appendChild(cityName);
  predictions__city.appendChild(countryName);
  document.querySelector(".predictions").appendChild(predictions__city);
}
