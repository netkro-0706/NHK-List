// /*
//     Information provision : Youtube
//     Information provision :ＮＨＫ
//     Information provision : 天気予報 API（livedoor 天気互換）

// */

const nhk = "JNp74IjTkPGBIzvTv3lGvvh5L1jTYCUW";
let showOnAir = document.querySelector(".show_OnAir");
let mainGenre = document.querySelector(".main_genre");
let genreSelect = document.querySelectorAll(".genre_item");

let nhk_url = new URL("https://api.nhk.or.jp/v2/pg/");
let resultHTML, programInfoList;

const NHK_channel = {
    NHK_総合1: "g1",
    NHK_Eテレ1: "e1",
    NHK_BS1: "s1",
    NHK_BS1プレミアム: "s3",
    NHK_ラジオ1: "r1",
    NHK_FM: "r3"
}

let todays_date = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
}

//area, service, date
const getProgramList = () => {
    let get_url = nhk_url + "list/130/g1/" + todays_date() + ".json?key=" + nhk;
    let func_name = "ProgramList";
    let data = getDataList(func_name, get_url);
}

//area, service, genre, date
const getProgramGenre = async (genre) => {
    let getChannel = genre.path[0].attributes[1].value;
    let get_url = nhk_url + `genre/130/g1/${getChannel}/${todays_date()}.json?key=${nhk}`;

    let func_name = "ProgramGenre";
    let data = await getDataList(func_name, get_url);
    console.log("genre : ", data);

    programInfoList = '';
    programInfoList = await Promise.all(data.list[Object.keys(data.list)[0]].map(channel => {
        return getProgramInfo(channel.service.id, channel.id)
    }));
    console.log("getInfo in genre : ", programInfoList);
    render_Programs();
}

//area, service, id
const getProgramInfo = async (channel, id) => {
    let get_url = nhk_url + "info/130/" + channel + "/" + id + ".json?key=" + nhk;

    let func_name = "ProgramInfo";
    let data = await getDataList(func_name, get_url);
    return data;
}

const getDataList = async (func_name, get_url) => {
    let data = await fetch(get_url)
        .then((response) => response.json())
        .catch((error) => console.log(error));

    //console.log(func_name + " : ", data);
    return data;
}

const render_Programs = () => {
    resultHTML = '';
    resultHTML = programInfoList.map(programInfo => {
        let info = programInfo.list[Object.keys(programInfo.list[0])];
        return `
        <div>
            <div class="bc_logo">
                <img src=${"http://"+(info.program_logo["url"]).substring(2)}>
            </div>
            <div>
                <div class="bc_title">
                    ${info.title}
                </div>
                <div class="bc_content">
                    ${info.content ? info.content : "内容無し"}
                </div>
                <div>
                    ${(info.start_time).substring(11,16)}
                </div>
            </div>
        </div>
        `;
    })

    mainGenre.innerHTML = resultHTML;
}

genreSelect.forEach((genre) => genre.addEventListener("click", (event) => {
    getProgramGenre(event);
    window.open("genre.html", "_blank");
}));

export {nhk, getProgramInfo};