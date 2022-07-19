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

var cityb = "Bangalore";
let weatherb = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (cityb) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityb + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((datac) => this.displayWeather(datac));
    },

    displayWeather: function (datab) {
        console.log(datab);
        const { name } = datab;
        const { description } = datab.weather[0];
        const { temp, humidity } = datab.main;
        const { speed } = datab.wind;
        document.querySelector(".cityb").innerHTML = "Bangalore";
        document.querySelector(".descriptionb").innerText = description;
        document.querySelector(".tempb").innerText = temp + "  °C";
        document.querySelector(".humidityb").innerText = "Humidity  " + humidity + "%";
        document.querySelector(".windb").innerText = "Wind Speed  " + speed;
    },
};
weatherb.fetchWeather("Bangalore");

var cityh = "Hyderabad";
let weatherh = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (cityh) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityh + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((datac) => this.displayWeather(datac));
    },

    displayWeather: function (datah) {
        console.log(datah);
        const { name } = datah;
        const { description } = datah.weather[0];
        const { temp, humidity } = datah.main;
        const { speed } = datah.wind;
        document.querySelector(".cityh").innerHTML = name;
        document.querySelector(".descriptionh").innerText = description;
        document.querySelector(".temph").innerText = temp + "  °C";
        document.querySelector(".humidityh").innerText = "Humidity  " + humidity + "%";
        document.querySelector(".windh").innerText = "Wind Speed  " + speed;
    },
};
weatherh.fetchWeather("Hyderabad");

var citym = "Mumbai";
let weatherm = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (citym) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citym + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((datac) => this.displayWeather(datac));
    },

    displayWeather: function (datam) {
        console.log(datam);
        const { name } = datam;
        const { description } = datam.weather[0];
        const { temp, humidity } = datam.main;
        const { speed } = datam.wind;
        document.querySelector(".citym").innerHTML = name;
        document.querySelector(".descriptionm").innerText = description;
        document.querySelector(".tempm").innerText = temp + "  °C";
        document.querySelector(".humiditym").innerText = "Humidity  " + humidity + "%";
        document.querySelector(".windm").innerText = "Wind Speed  " + speed;
    },
};
weatherm.fetchWeather("Mumbai");

var cityk = "Kolkata";
let weatherk = {
    apikey: "bc80fd2fa00aec4927ee0983987d1fd4",
    fetchWeather: function (cityk) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityk + "&units=metric&appid=" + this.apikey).then((response) => response.json()).then((datac) => this.displayWeather(datac));
    },

    displayWeather: function (datak) {
        console.log(datak);
        const { name } = datak;
        const { description } = datak.weather[0];
        const { temp, humidity } = datak.main;
        const { speed } = datak.wind;
        document.querySelector(".cityk").innerHTML = name;
        document.querySelector(".descriptionk").innerText = description;
        document.querySelector(".tempk").innerText = temp + "  °C";
        document.querySelector(".humidityk").innerText = "Humidity  " + humidity + "%";
        document.querySelector(".windk").innerText = "Wind Speed  " + speed;
    },
};
weatherk.fetchWeather("Kolkata");

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
const remove = (index) => {
    document.getElementsByClassName("parCity")[index].style.display = "none";
}

/*function addCity(){
    document.getElementById("plus").classList.toggle("show");
}
window.onclick= function(event){
    if(!event.target.matches('add-city')){
        document.getElementsByClassName("weather-loading").onclick=function(){
            fetchWeather()
            displayWeather()
        };
    }
}*/
/*document.addEventListener('DOMContentLoaded', (event) => {
function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
  }
  let items = document.querySelectorAll('.container .country-weather');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
  });
  items.forEach(function (item) {
    item.classList.remove('over');
  });

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}
function handleDrop(e) {
    e.stopPropagation(); 
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }
});

const grid=new Muuri('.row', {
        dragEnabled: true
      });











*/



/*
let div = document.createElement('div');
div.classList.add('country-weather');
let containerDiv = document.querySelector('.container');
containerDiv.appendChild(div);

let submitBtn = document.getElementById('btn');
submitBtn.addEventListener('click', addCity);
function addCity() {
    let { city,description,temp, humidity, wind_speed } = data.current;
    let name = document.querySelector(".city").innerText = "Weather in " + city;
    let desc = document.querySelector(".description").innerText = description;
    let tem = document.querySelector(".temp").innerText = temp + " °C";
    let hum = document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
    let wind = document.querySelector(".wind").innerText = "Wind Speed " + wind_speed;
    let html = `
    <div class="parCity">
        <h2 class="city" id="city">${city}</h2>
        <div class="header">
            <div class="dropdown">
                <ul class="dropbtn icons btn-right showLeft" onclick="showDropdown(4)">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="dropdown-content myDropdown">
                    <a href="#home" onclick="remove(4)">Remove</a>
                </div>
            </div>
        </div>
        <h1 class="temp" id="temp">${temp}</h1>
        <div class="flex">
            <div class="description" id="desc">${description}</div>
        </div>
        <div class="humidity" id="humidity" style="padding-left: 0px;">${humidity}</div>
            <div class="wind" id="wind">${wind_speed}</div>
    </div>`;
    div.insertAdjacentHTML('beforeend',html);
     
}










function slist(target) {
    target.classList.add("slist");
    let items = target.getElementsByClassName("parCity"), current = null;
    for (let i of items) {
        i.draggable = true;
        i.ondragstart = (evt) => {
            current = i;
            for (let it of items) {
                if (it != current) { it.classList.add("hint"); }
            }
        };
        i.ondragenter = (evt) => {
            if (i != current) { i.classList.add("active"); }
        };
        i.ondragleave = () => {
            i.classList.remove("active");
        };
        i.ondragend = () => {
            for (let it of items) {
                it.classList.remove("hint");
                it.classList.remove("active");
            }
        };
        i.ondragover = (evt) => { evt.preventDefault(); };
        i.ondrop = (evt) => {
            evt.preventDefault();
            if (i != current) {
                let currentpos = 0, droppedpos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) { currentpos = it; }
                    if (i == items[it]) { droppedpos = it; }
                }
                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(current, i);
                }
            }
        };
    }
}*/