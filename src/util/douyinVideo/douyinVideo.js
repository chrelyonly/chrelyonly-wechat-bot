import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


export const douyinVideo = (talker,message,room,bot)=>{
//     进行视频解析
    let api = "https://douyin.dy114.com/parse/index";
    let url = message.text();

    let params = {
        pageUrl: url,
    }
    http(api,"post",params, 1,{}).then( res=> {
        console.log(res)
        let fileBox = FileBox.fromUrl(res.data.data.data.voideurl);
        room.say(fileBox)
    },err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    }).catch(err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    })
}
