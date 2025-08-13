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
      document.getElementById(
        "city-name"
      ).textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById(
        "temperature"
      ).textContent = `${data.main.temp}°C`;
      document.getElementById(
        "humidity"
      ).textContent = `${data.main.humidity}%`;

      // 🆕 CHANGE — Simplify description and set icon
      const weatherDescription = data.weather[0].description.toLowerCase();
      let simpleCondition = "";
      let iconPath = "";

      if (weatherDescription.includes("rain")) {
        simpleCondition = "Rainy";
        iconPath = "./images/rainy.png";
      } else if (weatherDescription.includes("clear")) {
        simpleCondition = "Clear";
        iconPath = "./images/clear.png";
      } else if (weatherDescription.includes("cloud")) {
        simpleCondition = "Cloudy";
        iconPath = "./images/cloudy.png";
      } else if (weatherDescription.includes("sunny")) {
        simpleCondition = "Sunny";
        iconPath = "./images/sunny.png";
      } else {
        simpleCondition = "Clear"; // default
        iconPath = "./images/clear.png";
      }

      // Update DOM with simplified condition & icon
      document.getElementById("weather-condition").textContent = simpleCondition;
      weatherIcon.src = iconPath;
      weatherIcon.alt = simpleCondition;

      // End of 🆕 CHANGE

      document.getElementById(
        "wind-speed"
      ).textContent = `${data.wind.speed} km/h`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("City not found! Please enter a valid city name.");
    });
}

// 🌍 Default city on page load
getWeather("Lagos,NG");
