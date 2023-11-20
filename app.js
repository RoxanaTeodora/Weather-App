const inputSearch = document.querySelector(".input-box");
const searchBtn = document.getElementById("search-btn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-card");

// Built-in API request by city name
// You can call by city name or city name in lb engleza Bucharest Malaga Nairobi Prague Almaty Munich Alaska New York

//Serverul Web de Informații Meteorologice: Furnizează date meteorologice și oferă un API prin care
//aplicatia web poate solicita și primi aceste date.
//API-ul oferă reguli și endpoint-uri specifice pentru a accesa și manipula informațiile meteorologice.
//Prin intermediul DOM sau altor metode, aplicația poate face solicitări către API-ul serverului meteorologic pentru a obține date actualizate.
//API-ul acționează ca un intermediar, permițând aplicației web să comunice eficient cu serverul fără a cunoaște detaliile interne ale funcționării serverului.
//Aplicația poate extrage informațiile meteorologice furnizate de server și să le integreze în mod dinamic în cadrul interfeței sale utilizator.
//apiKey=șir de caractere unic și secret furnizat de un furnizor de servicii pentru a autentifica și autoriza accesul la serviciile sale

//functie asincrona cu wait fetch
async function checkWeather(city) {
  const apiKey = "bdf9bf7999a90897cdc09d451965ca78";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  //utilizare fetch pt obtinerea datelor din api endpoin si transformarea lor in json care apoi sa fie utilizate in DOM
  const weatherData = await fetch(`${url}`).then((response) => response.json());

  //display error for location clasa location_not_found trece din none la display:flex, clasa weatherBody ramane in display none
  if (weatherData.cod === `404`) {
    location_not_found.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("error");
    return;
  }
  //display clasa weatherBody si clasa in location_not_found ramene in display:none
  console.log("run");
  location_not_found.style.display = "none";
  weatherBody.style.display = "flex";

  //tranformare temperaturii din main  din kelvin in celsius, rotunjit
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;

  //wind.speed cu o zecimale
  windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)}km/h`;

  //schimbarea tipului de icon in functie de vreme
  if (weatherData.weather[0].main === "Clear") {
    weatherImg.src = "/img/sun.png";
  } else if (weatherData.weather[0].description === "broken clouds") {
    weatherImg.src = "/img/brokenclouds.png";
  } else if (weatherData.weather[0].description === "overcast clouds") {
    weatherImg.src = "/img/brokenclouds.png";
  } else if (weatherData.weather[0].main === "Clouds") {
    weatherImg.src = "/img/cloud.png";
  } else if (weatherData.weather[0].main === "Rain") {
    weatherImg.src = "/img/rain.png";
  } else if (weatherData.weather[0].main === "Storm") {
    weatherImg.src = "/img/strom.png";
  } else if (weatherData.weather[0].main === "Mist") {
    weatherImg.src = "/img/mist.png";
  } else if (weatherData.weather[0].main === "Snow") {
    weatherImg.src = "/img/snow.png";
  } else if (weatherData.weather[0].main === "Smoke") {
    weatherImg.src = "/img/smoke.png";
  } else if (weatherData.weather[0].main === "Fog") {
    weatherImg.src = "/img/smoke.png";
  }

  console.log(weatherData);
}

//prin apasarrea butonului de search se exercuta functia
searchBtn.addEventListener("click", () => {
  checkWeather(inputSearch.value);
});
