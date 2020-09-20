//define current time
let now = new Date();
let date = document.querySelector("#date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  date.innerHTML = `${day}, ${hour}:0${minutes}`;
}
if (hour < 10) {
  date.innerHTML = `${day}, $0{hour}:${minutes}`;
}
date.innerHTML = `${day}, ${hour}:${minutes}`;

function showWeather(response) {
  //search city
  let searchCity = document.querySelector("h2.city");
  function changeCity(event) {
    event.preventDefault();
    let apiKey = "c565dba580c3596e7501993ba5e14f58";
    let cityInput = document.querySelector("#input");
    searchCity.innerHTML = `${cityInput.value}`;
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(urlCity).then(showWeather);
  }
  let city = document.querySelector("#search-input");
  city.addEventListener("submit", changeCity);

  //convert to Fahrenheit/Celsius

  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `Feels Like: ${Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    )}ºF`;
    maxminTemp.innerHTML = ` ${Math.round(
      (response.data.main.temp_max * 9) / 5 + 32
    )}ºF|${Math.round((response.data.main.temp_min * 9) / 5 + 32)}ºF`;
  }

  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `Feels Like: ${Math.round(
      response.data.main.feels_like
    )}ºC`;
    maxminTemp.innerHTML = ` ${Math.round(
      response.data.main.temp_max
    )}ºC|${Math.round(response.data.main.temp_min)}ºC`;
  }

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", convertToCelsius);

  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = temperature;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].main}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}ºC`;
  let maxminTemp = document.querySelector("#maxmin");
  maxminTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}ºC|${Math.round(response.data.main.temp_min)}ºC`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;

  //icon
  let iconElement = document.querySelector("#icon1");
  console.log(response.data.weather[0].icon);
  // iconElement = `${response.data.weather[0].icon}`;
  iconElement = "01d";
  console.log(iconElement);
  //if (iconElement === "01d") {
  //  iconElement.innerHTML = <i class="fas fa - sun"></i>;
  //}
  if (iconElement === "01n") {
    iconElement.innerHTML = `<i class="fas fa-moon"></i>`;
  }
  if (iconElement === "02d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  }
  if (iconElement === "02n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon"></i>`;
  }
  if (iconElement === "03d" || iconElement === "03n") {
    iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
  }
  if (iconElement === "04d" || iconElement === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
  }
  if (iconElement === "09d" || iconElement === "09n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  }
  if (iconElement === "10d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
  }
  if (iconElement === "10n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  }
  if (iconElement === "11d" || iconElement === "11n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  }
  if (iconElement === "13d" || iconElement === "13n") {
    iconElement.innerHTML = `<i class="fas fa-snowflake"></i>`;
  }
  if (iconElement === "50d" || iconElement === "50n") {
    iconElement.innerHTML = `<i class="fas fa-smog"></i>`;
  }
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "c565dba580c3596e7501993ba5e14f58";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCurrent).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonCurrent = document.querySelector("#current-location-button");
buttonCurrent.addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(retrievePosition);
