import "./secondView.scss";
import { fetchWeatherData } from "./fetchData";
// import { getConditionCode } from "./main";

const testCities = ["Basel", "Kyoto", "Moskau"];

loadFavorietCities(testCities);

async function loadFavorietCities(city) {
  for (let i = 0; i < city.length; i++) {
    let data = await fetchWeatherData(testCities[i]);
    displayCities(
      data.location.name,
      data.location.country,
      data.current.condition.text,
      data.current.temp_c,
      data.forecast.forecastday[0].day.maxtemp_c,
      data.forecast.forecastday[0].day.mintemp_c,
      // getConditionCode(data),
    );
  }
}

function displayCities(name, country, condition, temp, maxTemp, minTemp) {
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
  favorite.addEventListener("click", function () {
    goToDetailView(name);
  });
  favorite.innerHTML = city;

  const favoriteList = document.querySelector(".favoriteList");
  favoriteList.appendChild(favorite);
}

function goToDetailView(name) {
  console.log(name);
  window.location.href = "../index.html";
}
