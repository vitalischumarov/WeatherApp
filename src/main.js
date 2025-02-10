import "./style.scss";
import { fetchWeatherData } from "./fetchData";
import { getConditionImagePath } from "./conditions";

let cityName = "Peking";
// https://www.weatherapi.com/docs/#
const WEATHER_API = `http://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=${cityName}&lang=DE&days=3`;

const cityNameEl = document.querySelector(".city");
const weatherEl = document.querySelector(".weather");
const conditionEl = document.querySelector(".condition");
const forcastEl = document.querySelector(".forcast");

// Hier werden alle wichtigen Funktionen aufgerufen, wenn die App startet
let data = await fetchWeatherData(WEATHER_API);
displayCityInformation(data);
displayForcastInformationText(data);
displayAllForeCast(data);
renderNextDay(data);
displayDetailView(data);

let isDay = dayOrNight(data, getCurrentHour(data));
let conditionCode = getConditionCode(data, getCurrentHour(data));

let conditionImage = getConditionImagePath(conditionCode, isDay);
displayConditionImage(conditionImage);

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
  let time = getCurrentHour(forecastDate);
  let selectedDay = 0;
  for (let i = 0; i <= 23; i++) {
    createSingleForcastBlock(
      renderForecastTime(
        forecastDate.forecast.forecastday[selectedDay].hour[time].time,
        i,
      ),
      forecastDate.forecast.forecastday[selectedDay].hour[time].condition.icon,
      forecastDate.forecast.forecastday[selectedDay].hour[time].temp_c,
    );
    time = time + 1;
    if (time > 23) {
      time = 0;
      selectedDay = 1;
    }
  }
}

function getCurrentTime() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  return hour;
}

function renderForecastTime(time, hour) {
  if (hour === 0) {
    return "now";
  } else {
    return time.split(" ")[1];
  }
}

function createUIForThreeDayForeCast(showDate, icon, temperature, windSpeed) {
  const forecastToday = document.createElement("div");
  forecastToday.classList.add("forecastToday");
  forecastToday.classList.add("styleDay");
  const forecastToday__day = document.createElement("div");
  forecastToday__day.classList.add("forecastToday__day");
  forecastToday__day.classList.add("text");
  const day = document.createTextNode(showDate);
  forecastToday__day.appendChild(day);
  const forecastToday__icon = document.createElement("div");
  const image = document.createElement("img");
  image.setAttribute("src", icon);
  image.classList.add("img_threeDayForecast");
  forecastToday__icon.appendChild(image);
  const forecastToday__temp = document.createElement("div");
  forecastToday__temp.classList.add("forecastToday__temp");
  forecastToday__temp.classList.add("text");
  const temp = document.createTextNode(temperature);
  forecastToday__temp.appendChild(temp);
  const forecastToday__wind = document.createElement("div");
  forecastToday__wind.classList.add("forecastToday__wind");
  forecastToday__wind.classList.add("text");
  const wind = document.createTextNode(`Wind: ${windSpeed} km/h`);
  forecastToday__wind.appendChild(wind);

  forecastToday.appendChild(forecastToday__day);
  forecastToday.appendChild(forecastToday__icon);
  forecastToday.appendChild(forecastToday__temp);
  forecastToday.appendChild(forecastToday__wind);

  document.querySelector(".threeDayForecast").appendChild(forecastToday);
}

function renderNextDay(forecastDay) {
  let day = "";
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      day = "Heute";
    } else {
      day = getWeekDay(forecastDay.forecast.forecastday[i].date);
    }
    let temp = `H: ${forecastDay.forecast.forecastday[i].day.maxtemp_c} L: ${forecastDay.forecast.forecastday[i].day.mintemp_c}`;
    let icon = forecastDay.forecast.forecastday[i].day.condition.icon;
    let windSpeed = forecastDay.forecast.forecastday[i].day.maxwind_kph;

    createUIForThreeDayForeCast(day, icon, temp, windSpeed);
  }
}

function getWeekDay(date) {
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const dayIndex = new Date(date).getDay();
  return weekdays[dayIndex];
}

function displayDetailView(day) {
  const humidity = document.querySelector(".humidity");
  const feel = document.querySelector(".feel");
  const sunrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");
  const rain = document.querySelector(".rain");
  const uvindex = document.querySelector(".uvindex");

  humidity.innerHTML = `${day.current.humidity}%`;
  feel.innerHTML = `${day.current.feelslike_c}°`;
  sunrise.innerHTML = convertTime(day.forecast.forecastday[0].astro.sunrise);
  sunset.innerHTML = convertTime(day.forecast.forecastday[0].astro.sunset);
  uvindex.innerHTML = day.forecast.forecastday[0].day.uv;
  rain.innerHTML = `${day.forecast.forecastday[0].day.totalprecip_mm}mm`;
}

function convertTime(timeString) {
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map((num) => parseInt(num));

  if (period === "AM" && hours === 12) {
    hours = 0;
  } else if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");

  return `${hoursFormatted}:${minutesFormatted} Uhr`;
}

function getCurrentHour(city) {
  const currentHour = new Date(city.location.localtime).getHours();
  return currentHour;
}

function dayOrNight(city, currentHour) {
  const dayStatus = city.forecast.forecastday[0].hour[currentHour].is_day;
  if (dayStatus === 1) {
    return false;
  } else {
    return true;
  }
}

function getConditionCode(city, currentHour) {
  const conditionCode =
    city.forecast.forecastday[0].hour[currentHour].condition.code;
  return conditionCode;
}

function displayConditionImage(image) {
  const background = document.querySelector(".app");
  background.style.backgroundImage = `url(${image})`;
}
