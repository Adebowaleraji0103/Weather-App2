// OpenWeatherMap API key and URL
const API_KEY = "b331259393768ae562a5ec0b002648e4";
const weatherBox = document.getElementById('Weather');
const countryInput = document.getElementById('input');

// Fetch weather data
const getWeather = async (country) => {
  try {
    let result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  );
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();

    // Update the weather box
    weatherBox.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherBox.innerHTML = `<h2>Error</h2><p>${error.message}</p>`;
  }
};

// Add event listener for input
countryInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const country = countryInput.value.trim();
    if (country) getWeather(country);
  }
});