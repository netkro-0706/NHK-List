const weather = "eaa6d0dcc2bafe5d8b0418bf276a4b45";
let weatherWrap = document.querySelector(".weather_wrap");

const weather_icon = {
    Rain: '<i class="fa-solid fa-cloud-rain fa-2xl"></i>',
    Clouds: '<i class="fa-solid fa-cloud fa-2xl"></i>',
    Clear: '<i class="fa-solid fa-sun fa-2xl"></i>',
    Snow: '<i class="fa-solid fa-snowflake fa-2xl"></i>'
}

const tokyoLocation = {
    lat: 35.6684415,
    lon: 139.6007818
}

const LocationCurrent = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let { latitude, longitude } = position.coords;
            getweather(latitude, longitude);
        });
    } else {
        getweather(tokyoLocation.lat, tokyoLocation.lon);
    }
}

let getweather = async (lat, lon) => {
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weather}`);
    let data = await fetch(url)
        .then((res) => res.json())
        .catch((error) => console.log("getweather : ", error));

    render_weather(data);
}

let render_weather = (weather_data) => {
    weatherWrap.innerHTML = `
        <div class="weather_div">
            <div class="weather_text">
                <div>${weather_data.name}</div>
                <div>${weather_data.main.temp}°C</div>
            </div>
            <div class="weather_icon">${weather_icon[weather_data.weather[0].main]}</div>
        </div>
    `
}


LocationCurrent();