import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


export const youtubeVideo = (talker,text,room,bot)=>{
//     进行视频解析
    let api = "https://cdn36.savetube.me";
    let params = {
        url: text,
    }
    let headers = {
        // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    http(api,"get",params, 1,headers).then( res=> {
        let fileBox = FileBox.fromUrl(res.data.data.video_formats[0].url, {name:"youtube.mp4"});
        room.say("解析成功:" + res.data.data.title)
        room.say(fileBox)
    },err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    }).catch(err =>{
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    })
}

youtubeVideo(null,"https://www.youtube.com/watch?v=49d95ni5J9Y",null,null);
