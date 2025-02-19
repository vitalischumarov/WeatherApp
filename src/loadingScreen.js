// // import "./loadingScreen.scss";

export function showLoadingScreen() {
  console.log("loading beginnt...");
  document.querySelector(".app").style.display = "none";
  document.querySelector(".loadingText").innerHTML = "loading ...";
}

export function deleteLoadingScreen() {
  console.log("loading zuende...");
  document.querySelector(".loadingText").style.display = "none";
  document.querySelector(".app").style.display = "flex";
}
