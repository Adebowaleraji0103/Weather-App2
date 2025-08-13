// 🔑 API Key
const API_KEY = "b331259393768ae562a5ec0b002648e4";

// Select DOM elements
const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");
const weatherIcon = document.getElementById("weather-icon"); // image element for icon

// Event listener for form submission
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = inputElement.value.trim();
  if (city !== "") {
    getWeather(city);
    inputElement.value = "";
  }
});

// Function to get weather data
function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      // 🌍 Update city, temp, and humidity
      document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;

      // 🆕 CHANGE — Use "main" for cleaner mapping
      const weatherMain = data.weather[0].main.toLowerCase();
      let simpleCondition = "";
      let iconPath = "";

      if (weatherMain === "rain") {
        simpleCondition = "Rainy";
        iconPath = "./images/rainy.jpg";
      } else if (weatherMain === "clouds") {
        simpleCondition = "Cloudy";
        iconPath = "./images/cloudy.png";
      } else if (weatherMain === "clear") {
        simpleCondition = "Sunny";
        iconPath = "./images/sunny.jpg";
      } else {
        simpleCondition = "Clear";
        iconPath = "./images/clear.png";
      }

      // Update condition text & icon
      document.getElementById("weather-condition").textContent = simpleCondition;
      weatherIcon.src = iconPath;
      weatherIcon.alt = simpleCondition;

      // 🌬️ Update wind speed
      document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("City not found! Please enter a valid city name.");
    });
}

// 🌍 Default city on page load
getWeather("Lagos,NG");
