function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = cityInput.value;
}

let h3 = document.querySelector("h3");
let currentTime = new Date();
h3.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("click", cityWeather);

//

function displayCity(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#search-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function cityWeather(event) {
  event.preventDefault();
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let cityApp = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApp}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCity);
}

function searchLocation(position) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", getCurrentLocation);
