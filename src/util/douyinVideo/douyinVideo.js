import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";
import "../newdate.js"

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
    http(api, "get", params, 1, {}).then(res => {
        log.info(res.data.data.url)

        let headers = {
            Referer: res.data.data.url
        }
        http(res.data.data.url, "get", {}, 3, headers).then(res2 => {
            // let msg = "";
            // msg += "解析成功: \n";
            // msg += "标题: " + res.data.data.title + "\n";
            // msg += "音乐地址: " + res.data.data.music_url + "\n";
            // msg += "作者: " + res.data.data.author + "\n";
            // room.say(msg)
            let fileBox = FileBox.fromBuffer(res2.data, new Date().Format("yyyyMMddHHmmss") + "oduyin.mp4");
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
