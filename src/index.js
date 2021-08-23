let now = new Date();
let h3 = document.querySelector("h3");

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
let minutes = now.getMinutes();

h3.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  document.querySelector("h2").innerHTML = city;
  let apiKey = "19245f1fde1b15bc22712eea7d142e13";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(currentWeater);
}

function currentWeater(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
