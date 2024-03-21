function tempUpdate(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descritionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formattedDate(date);
  cityElement.innerHTML = response.data.city;
  descritionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} alt="Weather Icon" class="temp-icon" />`;

  getForecast("Lome");
}

function searchCity(city) {
  let apiKey = "9f0940fbf3ca3obdd306d133a0041aft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(tempUpdate);
}
function formattedDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hour < 10 || minutes < 10) {
   hour = `0${hour}`, minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let inputForm = document.querySelector("#input-form");

  searchCity(inputForm.value);
}
function formatDay(timeStamp) {
  let date = new Date (timeStamp * 1000)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days [date.getDay()];
}
function getForecast(city){
    let apiKey = "9f0940fbf3ca3obdd306d133a0041aft";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {   
  let forecastHtml =  " ";

  response.data.daily.forEach((day, index) => {
    if (index < 5) {
      
      forecastHtml =
        forecastHtml +
        ` <div class="days">
              <div class="date"> ${formatDay(day.time)} </div>
              <div> <img src="${day.condition.icon_url}" class = "image"/>
              </div>
              <div class="forecast-temp">
                <span class="forecast-temp-max"><strong>${Math.round(
                  day.temperature.maximum
                )}º</strong></span> <span class="forecast-temp-min">${Math.round(
          day.temperature.minimum
        )}º</span>
              </div>
             </div>`;
                }
  });        
  forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lome");
