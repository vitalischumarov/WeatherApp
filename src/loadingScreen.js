export function showLoadingScreen() {
  console.log("loadingScreen");
  document.querySelector(".currentWeather").style.display = "none";
  const loadingText = "Loading...";
  const loadingDiv = document.createElement("div");
  loadingDiv.setAttribute("class", "loadingScreen");
  loadingDiv.innerHTML = loadingText;
  const rootElement = document.documentElement;
  rootElement.appendChild(loadingDiv);
}

export function deleteLoadingScreen() {
  document.querySelector(".loadingScreen").remove();
  document.querySelector(".currentWeather").style.display = "flex";
}
