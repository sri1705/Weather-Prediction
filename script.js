const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = 'bc80fd2fa00aec4927ee0983987d1fd4';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}
function showWeatherData(data) {
    let { temp, humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
        <div>Temperature</div>
        <div>${temp}</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity} %</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>`;
    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `<img src="C:/Users/Srisakthi/Desktop/Sri/cloud.png" alt="weather icon" class="w-icon">
            <div class="others">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`

        } else {
            otherDayForecast += `<div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="C:/Users/Srisakthi/Desktop/Sri/cloud.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>`
        }
    })
    weatherForecastEl.innerHTML = otherDayForecast;
}
let weather = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed " + speed;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
weather.fetchWeather("Dindigul");

var cityc = "Chennai";
let weatherc = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (cityc) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityc + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((datac) => this.displayWeather(datac));
    },

    displayWeather: function (datac) {
        console.log(datac);
        const { name } = datac;
        const { description } = datac.weather[0];
        const { temp, humidity } = datac.main;
        const { speed } = datac.wind;
        document.querySelector(".cityc").innerHTML = name;
        document.querySelector(".descriptionc").innerText = description;
        document.querySelector(".tempc").innerText = temp + "  °C";
        document.querySelector(".humidityc").innerText = "Humidity  " + humidity + "%";
        document.querySelector(".windc").innerText = "Wind Speed  " + speed;
    },
};
weatherc.fetchWeather("Chennai");
function showDropdown(value) {

    document.getElementsByClassName("myDropdown")[value].classList.toggle("show");
}
window.onclick = function (event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    if (!event.target.matches('dropbtn')) {
        var i;
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            document.getElementsByClassName("dropdown-content")[i].onclick = function () {
                showDropdown()
            };
        }
    }
}
function remove(index,btn1,btn2){
    document.getElementById(index).style.visibility = "hidden";
    document.getElementById(btn1).style.display="block";
    document.getElementById(btn2).style.display="none";
    if(btn1=='add0')
    document.getElementById('add0').style.visibility="visible";

}
