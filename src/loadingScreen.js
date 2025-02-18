// // import "./loadingScreen.scss";

export function showLoadingScreen() {
  console.log("loading beginnt...");
  document.querySelector(".app").style.display = "none";
}

export function deleteLoadingScreen() {
  console.log("loading zuende...");
  document.querySelector(".app").style.display = "flex";
}
