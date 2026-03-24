const apiKey = "1540a457fc6ab0bbd82a8c935fc917b2";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weatherBox");
const errorMsg = document.getElementById("errorMsg");

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
        } else {
            const data = await response.json();
            
            // Updating the User Interface with data from the API
            document.getElementById("cityName").innerHTML = data.name;
            document.getElementById("tempValue").innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById("description").innerHTML = data.weather[0].description;
            document.getElementById("humidity").innerHTML = data.main.humidity + "%";
            document.getElementById("windSpeed").innerHTML = data.wind.speed + " km/h";

            // Show the weather information and hide any previous error
            weatherBox.style.display = "block";
            errorMsg.style.display = "none";
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Trigger search on button click
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

// Trigger search when the "Enter" key is pressed
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value);
    }
});
