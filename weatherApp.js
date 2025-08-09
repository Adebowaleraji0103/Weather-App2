const apiKey = "b331259393768ae562a5ec0b002648e4";
const city = "Lagos,NG";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
.then(response => response.json())
.then(data =>{
    const cityName = data.name;
    const temperature = data.main.temp
    const humidity = data.main.humidity
    const weatherCondition = data.weather[0].description
    
    console.log(`city: ${cityName}`);
    console.log(`temperature: ${temperature}`)
    console.log(`humidity: ${humidity}` )
    // console.log(data)

})
.catch(error => {
    console.error("Error fetching weather data:",error)
})
