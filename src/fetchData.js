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

function showLoadingScreen() {
  console.log("loadingScreen");
  document.querySelector(".currentWeather").style.display = "none";
  const loadingText = "Loading...";
  const loadingDiv = document.createElement("div");
  loadingDiv.setAttribute("class", "loadingScreen");
  loadingDiv.innerHTML = loadingText;
  document.querySelector(".app").appendChild(loadingDiv);
}

function deleteLoadingScreen() {
  document.querySelector(".loadingScreen").remove();
  document.querySelector(".currentWeather").style.display = "flex";
}
