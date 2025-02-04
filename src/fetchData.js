import { showLoadingScreen, deleteLoadingScreen } from "./loadingScreen";

export async function fetchWeatherData(url) {
  showLoadingScreen();
  let response = await fetch(url);
  if (!response.status) {
    return;
  }
  let data = await response.json();
  deleteLoadingScreen();
  return data;
}
