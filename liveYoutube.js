let Youtube_api_url = new URL("https://www.googleapis.com/youtube/v3/search?key=");

const youtube = "AIzaSyD8_gRa0ld2rScZMZRwA1nnyH5jv98GXgU";
let dailyNews = document.querySelector(".daily_news");

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
    let get_url = Youtube_api_url += youtube;

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
        `<iframe class="youtube_news" src="https://www.youtube.com/embed/${video}?autoplay=1&mute=1" width="700"
    height="500" frameborder="0"></iframe>
    `;
}


combineYoutube_url();