let currentCity = null;
let apiKey = "c565dba580c3596e7501993ba5e14f58";
let forecast = null;
//define current time
function formatDate(timestamp) {
  let now = new Date(timestamp);

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
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  let iconId = `${response.data.weather[0].icon}`;
  let iconForecast = null;
  function showForecast(response2) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let iconIdForecast = null;
    for (let index = 0; index < 6; index++) {
      forecast = response2.data.list[index];
      console.log(forecast);

      forecastElement.innerHTML +=
        `<div class="col-2">
                <p><strong>${formatHours(forecast.dt * 1000)}</strong></p>
                <i class="fas small" id="icon` +
        index +
        `"></i>
                
              <p class="tempNumber"><small><strong>${Math.round(
                forecast.main.temp_max
              )}º</strong> ${Math.round(forecast.main.temp_min)}º</small></p>
               
               </div>`;
    }
    for (let index = 0; index < 6; index++) {
      forecast = response2.data.list[index];
      iconIdForecast = forecast.weather[0].icon;
      iconForecast = document.querySelector("#icon" + index);
      console.log(iconIdForecast);
      console.log(iconForecast);
      iconForecast.className = "fas small";
      if (iconIdForecast === "01d") {
        iconForecast.classList.add("fa-sun");
      }
      if (iconIdForecast === "01n") {
        iconForecast.classList.add("fa-moon");
      }
      if (iconIdForecast === "02d") {
        iconForecast.classList.add("fa-cloud-sun", "day");
      }
      if (iconIdForecast === "02n") {
        iconForecast.classList.add("fa-cloud-moon", "night");
      }
      if (iconIdForecast === "03d" || iconIdForecast === "03n") {
        iconForecast.classList.add("fa-cloud", "cloud");
      }
      if (iconIdForecast === "04d" || iconIdForecast === "04n") {
        iconForecast.classList.add("fa-cloud", "cloud");
      }
      if (iconIdForecast === "09d" || iconIdForecast === "09n") {
        iconForecast.classList.add("fa-cloud-showers-heavy", "cloud");
      }
      if (iconIdForecast === "10d") {
        iconForecast.classList.add("fa-cloud-sun-rain", "day");
      }
      if (iconIdForecast === "10n") {
        iconForecast.classList.add("fa-cloud-moon-rain", "night");
      }
      if (iconIdForecast === "11d" || iconIdForecast === "11n") {
        iconForecast.classList.add("fa-cloud-showers-heavy", "cloud");
      }
      if (iconIdForecast === "13d" || iconIdForecast === "13n") {
        iconForecast.classList.add("fa-snowflake");
      }
      if (iconIdForecast === "50d" || iconIdForecast === "50n") {
        iconForecast.classList.add("fa-smog", "cloud");
      }
    }
  }

  //search city
  let searchCity = document.querySelector("h2.city");
  function changeCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#input");
    searchCity.innerHTML = cityInput.value;
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(urlCity).then(showWeather);
    iconElement.className = "fas";

    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(urlForecast).then(showForecast);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
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
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    // let forecastTemp=document.querySelector("tempNumber");
    // forecastTemp.innerHTML =
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
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", convertToCelsius);

  console.log(response);
  let date = document.querySelector("#date-time");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = temperature;
  currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
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
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&units=metric&appid=${apiKey}`;
  console.log(currentCity);
  axios.get(urlForecast).then(showForecast);

  //icon
  if (iconId === "01d") {
    iconElement.classList.add("fa-sun");
  }
  if (iconId === "01n") {
    iconElement.classList.add("fa-moon");
  }
  if (iconId === "02d") {
    iconElement.classList.add("fa-cloud-sun", "day");
  }
  if (iconId === "02n") {
    iconElement.classList.add("fa-cloud-moon", "night");
  }
  if (iconId === "03d" || iconId === "03n") {
    iconElement.classList.add("fa-cloud", "cloud");
  }
  if (iconId === "04d" || iconId === "04n") {
    iconElement.classList.add("fa-cloud", "cloud");
  }
  if (iconId === "09d" || iconId === "09n") {
    iconElement.classList.add("fa-cloud-showers-heavy", "cloud");
  }
  if (iconId === "10d") {
    iconElement.classList.add("fa-cloud-sun-rain", "day");
  }
  if (iconId === "10n") {
    iconElement.classList.add("fa-cloud-moon-rain", "night");
  }
  if (iconId === "11d" || iconId === "11n") {
    iconElement.classList.add("fa-cloud-showers-heavy", "cloud");
  }
  if (iconId === "13d" || iconId === "13n") {
    iconElement.classList.add("fa-snowflake");
  }
  if (iconId === "50d" || iconId === "50n") {
    iconElement.classList.add("fa-smog", "cloud");
  }
}

function retrievePosition(position) {
  console.log(position);
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
