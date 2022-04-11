/*
    API Key : JNp74IjTkPGBIzvTv3lGvvh5L1jTYCUW

*/

let url = new URL("https://api.nhk.or.jp/v2/pg/");
const key = "JNp74IjTkPGBIzvTv3lGvvh5L1jTYCUW";


let todays_date = ()=>{
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return year+'-'+month+'-'+day;
}

const getProgramList = ()=>{
    let get_url = url+"list/130/g1/"+todays_date()+".json?key="+key;
    let func_name = "ProgramList";
    getDataList(func_name, get_url);
}
const getProgramGenre = ()=>{
    let get_url = url+"genre/130/g1/0000/2022-04-11.json?key="+key;

    let func_name = "ProgramGenre";
    getDataList(func_name, get_url);
}

const getProgramInfo = ()=>{
    let get_url = url+"info/130/g1/2022041129370.json?key="+key;

    let func_name = "ProgramInfo";
    getDataList(func_name, get_url);
}

const getNowOnAir = ()=>{
    let get_url = url+"now/130/g1.json?key="+key;

    let func_name = "NowOnAir";
    getDataList(func_name, get_url);
}

const getDataList = async(func_name, get_url)=>{
    let data = await fetch(get_url)
        .then((response) => response.json())
        .catch((error) => console.log(error));

    console.log(func_name+" : ",data);
}

getProgramList();
getProgramGenre();
getProgramInfo();
getNowOnAir();