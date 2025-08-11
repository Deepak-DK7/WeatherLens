const apikey = "f33a596d88562498d751566f4d178e46";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("input-city");
const searchBtn = document.querySelector(".input-btn");
const weatherIcon = document.querySelector('.weather-icon')

if(navigator.onLine)
{
console.log('you are online');

async function CheckWeather(City){
    const response = await fetch(apiurl + City + `&appid=${apikey}`)
 
    if(response.status == 404){
        window.alert('enter the correct city name');
    }
    else{
        let data = await response.json();
        // console.log(data);

        
        document.querySelector(".city-name").innerHTML = data.name + " with " + data.weather[0].description;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".speed").innerHTML = data.wind.speed + " km/hr";
        

        //timezone
        const actualDate = new Date();
        const timezoneOffset = data.timezone; // Offset in seconds from UTC
        const now = new Date();
        const localTime = now.getTime(); // Local time in milliseconds
        const localOffset = now.getTimezoneOffset() * 60000; // Local timezone offset in milliseconds
        const utc = localTime + localOffset; // UTC time in milliseconds
        const countryTime = new Date(utc + (timezoneOffset * 1000)); // Country's local time

        const formattedCountryTime = countryTime.toLocaleString('en-US', { 
            // timeZoneName: 'short',
            hour: 'numeric', 
            minute: 'numeric' 
        });
        
        document.querySelector(".timezone").innerHTML = `${formattedCountryTime}`
        document.querySelector(".date").innerHTML = actualDate.toUTCString();
        //timezone end
      
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = 'assests/clouds.png';
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = 'assests/clear.png';
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = 'assests/rain.png';
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = 'assests/snow.png';
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = 'assests/drizzle.png';
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = 'assests/mist.png';
        }

        document.querySelector(".weather-info").style.display = 'block';
        searchBox.value = "";
    }
}

searchBtn.addEventListener('click', () => {
    CheckWeather(searchBox.value);
})

document.addEventListener('keypress', (e) => {
    if(e.key == "Enter") searchBtn.click();
})

}
else{
    alert("you are offline");
}





