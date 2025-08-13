// 🔑 API Key (keep at the top for easy change)
const API_KEY = "b331259393768ae562a5ec0b002648e4";

// Select DOM elements
const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");

// Event listener for form submission
formElement.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const city = inputElement.value.trim(); // Get input value without extra spaces
  if (city !== "") {
    getWeather(city);
    inputElement.value = ""; // Clear input after search
  }
});

// Function to get weather data
function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("City not found"); // Handle invalid cities
      return response.json();
    })
    .then((data) => {
      // Update HTML with API data
      document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("weather-condition").textContent = data.weather[0].description;
      document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("City not found! Please enter a valid city name.");
    });
}

// 🌍 Default city on page load
getWeather("Lagos,NG");
