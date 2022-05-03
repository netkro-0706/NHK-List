import { nhk, getProgramInfo } from "./main.js";

//area, service
const getNowOnAir = async (channel) => {
    let get_url = nhk_url + "now/130/" + channel + ".json?key=" + nhk;

    let func_name = "NowOnAir";
    let data = await getDataList(func_name, get_url);
    render_OnAir(data, channel);
}


const render_OnAir = async (live_data, channel) => {

    let live_info = live_data.nowonair_list[channel].present;

    let OnAir_link = await getProgramInfo(live_info.id, channel);
    showOnAir.innerHTML = `
    <a href="${"http://" + (OnAir_link.list[channel][0].program_url).substring(2)}" target="_blank">
        <div class="OnAir_img show_item">
            <img src="${"http://" + (live_info.service.logo_l.url).substring(2)}">
        </div>
        <div class="OnAir_info show_item">
            <div class="OnAir_castingTime OnAir_item">${live_info.start_time.substring(11, 16)} ~ ${live_info.end_time.substring(11, 16)}</div>
            <div class="OnAir_title OnAir_item">${live_info.title}</div>
            <div class="OnAir_subtitle OnAir_item">${live_info.subtitle}</div>
        </div>
    </a>
    `
}


getNowOnAir("g1");