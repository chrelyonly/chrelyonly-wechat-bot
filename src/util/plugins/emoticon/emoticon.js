import {http} from "../../https.js";
import {FileBox} from "file-box";
import gifResize from '@gumlet/gif-resize'
import {log} from "wechaty";
// 接口地址
const url = "https://api.chrelyonly.cn/api/emoji"
// 测试接口
// const url = "https://my-util-api.dj.non-human-research-center.top/emoji"
// 本地接口
// const url = "http://192.168.227.130:8084/emoji"
/**
 * 发送接口
 */
export const sendApi = (item, room, bot, text) => {
    let params = {
        ...item.params,
        "subTitle": text ? text : item.params.subTitle
    }
    let headers = {}
    // 返回图片
    http(`${url}${item.path}`, "get", params, 3, headers).then(res => {
        // 根据响应头判断文件类型 image/png
        let header = res.headers["content-type"];
        if (!header) {
            return;
        }
        let name = header.split("/")[1]
        // 如果是gif
        if (name === "gif") {
            // 尝试压缩
            let msgTemp = "信息:\n";
            msgTemp += "压缩前大小:" + res.data.length / 1024 + "KB\n"
            log.info("压缩前大小: " + msgTemp)
            // const buffer = Buffer.from(res.data)
            gifResize({width: 200, optimizationLevel: 1})(res.data).then(res2 => {
                const fileBox = FileBox.fromBuffer(res2, item.key + "." + name)
                msgTemp += "压缩后大小:" + fileBox.size / 1024 + "KB\n"
                msgTemp += "压缩模式:1"
                log.info("压缩结束: " + msgTemp)
                // room.say(msgTemp)
                room.say(fileBox)
            }, err => {
                log.info(err)
                room.say("压缩图片异常" + err.message)
                const fileBox = FileBox.fromBuffer(res.data, item.key + ".gif")
                room.say(fileBox)
            }).catch(err => {
                log.info(err)
                room.say("接口通信异常" + err.message)
                const fileBox = FileBox.fromBuffer(res.data, item.key + ".gif")
                room.say(fileBox)
            })
            return
        }
        // 如果是图片
        const fileBox = FileBox.fromBuffer(res.data, item.key + "." + name)
        room.say(fileBox)
        return
    }, err => {
        log.info(err)
        // room.say("接口通信异常" + err.message)
    }).catch(err => {
        log.info(err)
        // room.say("接口通信异常" + err.message)
    })
}
