function tempUpdate(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
temperatureElement.innerHTML = Math.round (temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "9f0940fbf3ca3obdd306d133a0041aft";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(tempUpdate)
  }


function handleSearchSubmit(event){
  event.preventDefault();
  let inputForm = document.querySelector("#input-form");

  searchCity(inputForm.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener ("submit", handleSearchSubmit);

searchCity("Lome");