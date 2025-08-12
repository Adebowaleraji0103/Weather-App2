const apiKey = "b331259393768ae562a5ec0b002648e4";
const city = "Lagos,NG";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

formElement = document.getElementById(form)

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherCondition = data.weather[0].description;
    const feelLikeTemperature = data.main.feels_like;

    console.log(`city: ${cityName}`);
    console.log(`temperature: ${temperature}`);
    console.log(`humidity: ${humidity}`);
    console.log(`weatherCondition: ${weatherCondition}`);
     console.log(`feel-Like-Temperature ${feelLikeTemperature}`);

    // console.log(data)
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });
