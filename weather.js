//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const hyperlink = "https://api.openweathermap.org/data/2.5/weather?q=";
const city = "Chisinau";
const keyAPIaccess = "&appid=";
const ApiKey = "ca3d79911c9a73fc7b525833f2c0db17";
const API = hyperlink + city + keyAPIaccess + ApiKey;

const weatherSection = document.getElementsByClassName("weatherSection")[0];
const weatherData = document.getElementById("weatherData");

fetch(API)
    .then(res => res.json())
    .then(data => {
        const temp = parseInt(data.main.temp - 273.15) + "°C";
        const tempP = document.createElement('p');
        tempP.innerText = temp;
        tempP.setAttribute("id", "temp");
        weatherData.appendChild(tempP);

        const weather = data.weather[0].description;
        const weatherP = document.createElement('p');
        weatherP.innerText = weather;
        weatherP.setAttribute("id", "weather");
        weatherData.appendChild(weatherP);

        const image = document.createElement("img");
        image.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        image.setAttribute("id", "weatherIcon");
        weatherSection.appendChild(image);
    });