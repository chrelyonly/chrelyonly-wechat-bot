import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


export const douyinVideo = (talker,text,room,bot)=>{
//     进行视频解析
    let api = "https://douyin.dy114.com/parse/index";
    let params = {
        pageUrl: text,
    }
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    http(api,"post",params, 2,headers).then( res=> {
        let fileBox = FileBox.fromUrl(res.data.data.data.voideurl, {name:"oduyin.mp4"});
        room.say(fileBox)
    },err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    }).catch(err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    })
}
