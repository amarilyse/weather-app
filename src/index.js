let now = new Date();
let dateTime = document.querySelector("#date-time");

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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  document.querySelector("#current-city").innerHTML = city;
  let apiKey = "19245f1fde1b15bc22712eea7d142e13";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(currentWeater);
}

function currentWeater(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML =
    Math.round(celsiusTemp);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconImg = document.querySelector("#icon-img");

  iconImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconImg.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-degrees");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-degrees");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsisuLink = document.querySelector("#celsius-link");
celsisuLink.addEventListener("click", displayCelsius);
