

let weatherWrap = document.querySelector(".weather_wrap");
let weather_api_url = new URL("https://weather.tsukumijima.net/api/forecast/city/");

const weather_region = {
    札幌: "016010",
    東京: "130010",
    大阪: "270000",
    福岡: "400010"
}

let spreadRegionToWether = () => {
    Object.keys(weather_region).forEach(region => {
        getweather(weather_region[region]);
    });
}
let getweather = async (region_id) => {

    let data = await fetch(weather_api_url + region_id)
        .then((res) => res.json())
        .catch((error) => console.log("getweather : ", error));

    //console.log("getweather data", data);
    render_weather(data);
}

let render_weather = (weather_data) => {
    weatherWrap.innerHTML +=
        `   <div class="weather_div">
            <div class="weather_region">${weather_data.location.city}</div>
            <div class="weather_img">
                <img class="weather_img_src" src="${weather_data.forecasts[0].image.url}">
            </div>
            <div class="weather_temp">
                ${weather_data.forecasts[0].temperature.max.celsius ? weather_data.forecasts[0].temperature.max.celsius + "°C" : "-"}
                / ${weather_data.forecasts[0].temperature.min.celsius ? weather_data.forecasts[0].temperature.min.celsius + "°C" : "-"}
            </div>
            <div class="weather_precip">${weather_data.forecasts[0].chanceOfRain.T12_18 ? weather_data.forecasts[0].chanceOfRain.T12_18 : "-"}</div>
        </div>
    `
}


spreadRegionToWether();