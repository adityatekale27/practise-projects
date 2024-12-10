document.addEventListener("DOMContentLoaded", () => {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const description = document.getElementById("description");
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-button");
  const errorMsg = document.getElementById("error");
  const weatherInfoDiv = document.getElementById("weather-info");

  const API_KEY = "dbb7337f348ce6e130050a2809cb4638";
  cityInput.value = "";

  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (cityInput.value === "") return;

    try {
      const weatherData = await getWeatherInfo(city);
      displayWeatherInfo(weatherData);
      cityInput.value = "";
    } catch (error) {
      displayError();
    }
  });

  async function getWeatherInfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`City not Found. Try again!`);

    const data = await response.json();
    return data;
  }

  function displayWeatherInfo(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;
    description.textContent = data.weather[0].description;

    weatherInfoDiv.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function displayError() {
    weatherInfoDiv.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
