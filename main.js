// /*
//     NHK ch ID : UCGCZAYq5Xxojl_tSXcVJhiQ
//     Information provision : Youtube
//     Information provision :ＮＨＫ
//     Information provision : 天気予報 API（livedoor 天気互換）

// */

let dailyNews = document.querySelector(".daily_news");
let weatherWrap = document.querySelector(".weather_wrap");
let showOnAir = document.querySelector(".show_OnAir");

let nhk_url = new URL("https://api.nhk.or.jp/v2/pg/");
const nhk_key = keys.nhk_key;
let Youtube_api_url = new URL("https://www.googleapis.com/youtube/v3/search?key=");
const youtube_key = keys.youtube_key;
let weather_api_url = new URL("https://weather.tsukumijima.net/api/forecast/city/");


const weather_region = {
    札幌 : "016010",
    東京 : "130010",
    大阪 : "270000",
    福岡 : "400010"
}

const NHK_channel = {
    NHK_総合1 : "g1",
    NHK_Eテレ1 : "e1",
    NHK_BS1 : "s1",
    NHK_BS1プレミアム : "s3",
    NHK_ラジオ1 : "r1",
    NHK_FM : "r3"
}

let spreadRegionToWether = ()=>{
    Object.keys(weather_region).forEach(region=>{
        getweather(weather_region[region]);
    });
}
let getweather = async (region_id) => {
    
    let data = await fetch(weather_api_url+region_id)
        .then((res) => res.json())
        .catch((error) => console.log("getweather : ", error));

    //console.log("getweather data", data);
    render_weather(data);
}

let render_weather = (weather_data)=>{
    weatherWrap.innerHTML += 
    `   <div class="weather_div">
            <div class="weather_region">${weather_data.location.city}</div>
            <div class="weather_img">
                <img class="weather_img_src" src="${weather_data.forecasts[0].image.url}">
            </div>
            <div class="weather_temp">
                ${weather_data.forecasts[0].temperature.max.celsius ? weather_data.forecasts[0].temperature.max.celsius+"°C" : "-"}
                / ${weather_data.forecasts[0].temperature.min.celsius ? weather_data.forecasts[0].temperature.min.celsius+"°C" : "-"}
            </div>
            <div class="weather_precip">${weather_data.forecasts[0].chanceOfRain.T12_18 ? weather_data.forecasts[0].chanceOfRain.T12_18 : "-"}</div>
        </div>
    `
}

//Live Newsを得るためのAPI要素
const youtube_option = {
    q: "JapaNews24",
    part: "snippet",
    channelId: "UCGCZAYq5Xxojl_tSXcVJhiQ",
    type: "video",
    eventType: "live",
    maxResults: 1
}


let combineYoutube_url = () => {
    let get_url = Youtube_api_url += youtube_key;

    Object.keys(youtube_option).forEach(res => {
        get_url += "&" + res + "=" + youtube_option[res];
    });
    getYoutube_video(get_url);
}

let getYoutube_video = async (url) => {

    let data = await fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));

    let live_video_id = data.items[0].id.videoId;

    render_live_video(live_video_id);
}

let render_live_video = (video) => {

    dailyNews.innerHTML =
        `<iframe class="youtube_news" src="https://www.youtube.com/embed/${video}" width="700"
    height="500" frameborder="0"></iframe>
    `;
}





let todays_date = ()=>{
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return year+'-'+month+'-'+day;
}

//area, service, date
const getProgramList = ()=>{
    let get_url = nhk_url+"list/130/g1/"+todays_date()+".json?key="+nhk_key;
    let func_name = "ProgramList";
    let data = getDataList(func_name, get_url);
}

//area, service, genre, date
const getProgramGenre = ()=>{
    let get_url = nhk_url+"genre/130/g1/0000/"+todays_date()+".json?key="+nhk_key;

    let func_name = "ProgramGenre";
    let data = getDataList(func_name, get_url);
}

//area, service, id
const getProgramInfo = async(id, channel)=>{
    let get_url = nhk_url+"info/130/"+channel+"/"+id+".json?key="+nhk_key;

    let func_name = "ProgramInfo";
    let data = await getDataList(func_name, get_url);
    return data;
}

//area, service
const getNowOnAir = async(channel)=>{
    let get_url = nhk_url+"now/130/"+channel+".json?key="+nhk_key;
    
    let func_name = "NowOnAir";
    let data = await getDataList(func_name, get_url);
    render_OnAir(data, channel);
}

const getDataList = async(func_name, get_url)=>{
    let data = await fetch(get_url)
        .then((response) => response.json())
        .catch((error) => console.log(error));

    console.log(func_name+" : ",data);
    return data;
}

const render_OnAir = async(live_data, channel)=>{
    
    let live_info = live_data.nowonair_list[channel].present;

    let OnAir_link = await getProgramInfo(live_info.id, channel);
    showOnAir.innerHTML = `
    <a href="${OnAir_link.list[channel][0].program_url}" target="_blank">
        <div class="OnAir_img show_item">
            <img src="${live_info.service.logo_l.url}">
        </div>
        <div class="OnAir_info show_item">
            <div class="OnAir_castingTime OnAir_item">${live_info.start_time.substring(11,16)} ~ ${live_info.end_time.substring(11,16)}</div>
            <div class="OnAir_title OnAir_item">${live_info.title}</div>
            <div class="OnAir_subtitle OnAir_item">${live_info.subtitle}</div>
        </div>
    </a>
    `
}




getNowOnAir("g1");
spreadRegionToWether();

combineYoutube_url();

// getProgramList();
// getProgramGenre();
// getProgramInfo();
//getNowOnAir();