//Homework 4
function showWeather(response) {
  //Feature 1
  let now = new Date();
  let date = document.querySelector("h3.date-time");
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
  } else {
    date.innerHTML = `${day}, ${hour}:${minutes}`;
  }

  //Feature 2
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

  //Bonus Feature
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `Feels Like: ${Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    )}ºF`;
    let minTemp = document.querySelector("#min-temp");
    minTemp.innerHTML = `Min Temp: ${Math.round(
      (response.data.main.temp_min * 9) / 5 + 32
    )}ºF`;
    let maxTemp = document.querySelector("#max-temp");
    maxTemp.innerHTML = `Max Temp: ${Math.round(
      (response.data.main.temp_max * 9) / 5 + 32
    )}ºF`;
  }

  function convertToCelcius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `Feels Like: ${Math.round(
      response.data.main.feels_like
    )}ºC`;
    let minTemp = document.querySelector("#min-temp");
    minTemp.innerHTML = `Min Temp: ${Math.round(
      response.data.main.temp_min
    )}ºC`;
    let maxTemp = document.querySelector("#max-temp");
    maxTemp.innerHTML = `Max Temp: ${Math.round(
      response.data.main.temp_max
    )}ºC`;
  }
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  let celciusLink = document.querySelector("#celcius");
  celciusLink.addEventListener("click", convertToCelcius);
  //
  //Homework 5

  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = temperature;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}ºC`;
  let maxminTemp = document.querySelector("#maxmin");
  maxminTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}ºC|${Math.round(response.data.main.temp_min)}ºC`;
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
