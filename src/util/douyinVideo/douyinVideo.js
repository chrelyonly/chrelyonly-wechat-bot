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
    let params = {
        pageUrl: text,
    }
    const urls = extractUrl(text);
    let headers = {
        url: urls[0]
    }
    log.info(urls[0])
    http(api, "get", params, 1, headers).then(res => {
        log.info("解析结果")
        log.info(JSON.stringify(res))
        let fileBox = FileBox.fromUrl(res.data.data.url, {name: "oduyin.mp4"});
        room.say(fileBox)
    }, err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    }).catch(err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确")
    })
}
