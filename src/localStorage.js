export function loadCitiesFromLocalStorage() {
  let citiesStorage = JSON.parse(localStorage.getItem("allFavoriteCities"));
  return citiesStorage;
}

export function saveCityToLocalStorage(name) {
  console.log(`new city is: ${name}`);
  const newListOfCities = addCityToList(name);
  const formatedList = JSON.stringify(newListOfCities);
  localStorage.setItem("allFavoriteCities", formatedList);
}

function addCityToList(name) {
  let list = loadCitiesFromLocalStorage();
  if (list === null) {
    console.log("ist leer");
    list = [];
    list.push(name);
  } else {
    list.push(name);
  }
  return list;
}

export function updateFavoriteList(favoriteList) {
  console.log(`current List ist: ${favoriteList}`);
  const formatedList = JSON.stringify(favoriteList);
  localStorage.setItem("allFavoriteCities", formatedList);
}
