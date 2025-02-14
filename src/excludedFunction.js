export function getConditionCode(city, currentHour) {
  const conditionCode =
    city.forecast.forecastday[0].hour[currentHour].condition.code;
  return conditionCode;
}

export function dayOrNight(city, currentHour) {
  const dayStatus = city.forecast.forecastday[0].hour[currentHour].is_day;
  if (dayStatus === 1) {
    return false;
  } else {
    return true;
  }
}

export function getCurrentHour(city) {
  const currentHour = new Date(city.location.localtime).getHours();
  return currentHour;
}
