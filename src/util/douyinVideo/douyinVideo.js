import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


/**
 * 返回匹配的域名
 * @param text
 * @returns {*}
 */
function extractUrl(text) {
    const regex = /https?:\/\/\S+/g;  // 匹配http或https开头的URL
    return text.match(regex);  // 返回所有匹配的URL
}

export const douyinVideo = (talker, text, room, bot) => {
    log.info("正在解析抖音视频......")
//     进行视频解析
    let api = "https://api.pearktrue.cn/api/video/douyin/";
    const urls = extractUrl(text);
    let params = {
        url: urls[0]
    }
    let headers = {
    }
    http(api, "get", params, 1, {}).then(res => {

        log.info(res.data.data.url)
        http(res.data.data.url, "get", {}, 3, {}).then(res2 => {
            let fileBox = FileBox.fromBuffer(res2.data, "oduyin.mp4");
            room.say(fileBox)
        })
    }, err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    }).catch(err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    })
}
