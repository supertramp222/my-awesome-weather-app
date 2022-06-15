//Challenge 1 - Current Time and Date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day}, ${hours}:${minutes}`;
}

let currentTime = new Date();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(currentTime);

//Accurate Weather API
function searchCity(city) {
  let unit = "metric";
  let apiKey = "6ad09e88b3e793860ef68d84c8bf5d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  //City
  document.querySelector("#current-city").innerHTML = response.data.name;
  //Temperature
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  //Humidity
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  //Wind
  document.querySelector("#current-wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  //Description
  document.querySelector("#weather-details").innerHTML =
    response.data.weather[0].main;
}

function hadnleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#searched-city").value;

  searchCity(city);
}

//Search current location
function searchLocation(position) {
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6ad09e88b3e793860ef68d84c8bf5d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Search Btn
let cityButtonSearch = document.querySelector("#search-form");
cityButtonSearch.addEventListener("submit", hadnleSubmit);

//Current Btn
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default Search
searchCity("New York");
