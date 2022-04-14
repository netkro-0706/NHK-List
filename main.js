// /*
//     NHK ch ID : UCGCZAYq5Xxojl_tSXcVJhiQ
//     Information provision : Youtube
//     Information provision :ＮＨＫ
//     

// */

let dailyNews = document.querySelector(".daily_news");

// let nhk_url = new URL("https://api.nhk.or.jp/v2/pg/");
// const nhk_key = process.env.REACT_APP_nhk_key;
let Youtube_api_url = new URL("https://www.googleapis.com/youtube/v3/search?key=");
const youtube_key = process.env.REACT_APP_youtube_key;



//Live Newsを得るためのAPI要素
const youtube_option = {
    q : "JapaNews24",
    part : "snippet",
    channelId : "UCGCZAYq5Xxojl_tSXcVJhiQ",
    type : "video",
    eventType : "live",
    maxResults : 1    
}


let combineYoutube_url = ()=>{
    let get_url = Youtube_api_url += youtube_key;

    Object.keys(youtube_option).forEach(res => {
        get_url += "&" + res + "=" + youtube_option[res];
    });
    getYoutube_video(get_url);
}

let getYoutube_video = async(url)=>{
    
    let data = await fetch(url)
    .then((response)=>response.json())
    .catch((error) =>console.log(error));

    let live_video_id = data.items[0].id.videoId;

    render_live_video(live_video_id);
}

let render_live_video = (video)=>{

    dailyNews.innerHTML = 
    `<iframe src="https://www.youtube.com/embed/${video}" width="700"
    height="500" frameborder="0"></iframe>
    `;
}





// let todays_date = ()=>{
//     let today = new Date();
//     let year = today.getFullYear();
//     let month = ('0' + (today.getMonth() + 1)).slice(-2);
//     let day = ('0' + today.getDate()).slice(-2);

//     return year+'-'+month+'-'+day;
// }

// //area, service, date
// const getProgramList = ()=>{
//     let get_url = nhk_url+"list/130/g1/"+todays_date()+".json?key="+nhk_key;
//     let func_name = "ProgramList";
//     getDataList(func_name, get_url);
// }

// //area, service, genre, date
// const getProgramGenre = ()=>{
//     let get_url = nhk_url+"genre/130/g1/0000/"+todays_date()+".json?key="+nhk_key;

//     let func_name = "ProgramGenre";
//     getDataList(func_name, get_url);
// }

// //area, service, id
// const getProgramInfo = ()=>{
//     let get_url = nhk_url+"info/130/g1/2022041129370.json?key="+nhk_key;

//     let func_name = "ProgramInfo";
//     getDataList(func_name, get_url);
// }

// //area, service
// const getNowOnAir = ()=>{
//     let get_url = nhk_url+"now/130/g1.json?key="+nhk_key;

//     let func_name = "NowOnAir";
//     getDataList(func_name, get_url);
// }

// const getDataList = async(func_name, get_url)=>{
//     let data = await fetch(get_url)
//         .then((response) => response.json())
//         .catch((error) => console.log(error));

//     console.log(func_name+" : ",data);
// }



combineYoutube_url();

// getProgramList();
// getProgramGenre();
// getProgramInfo();
// getNowOnAir();