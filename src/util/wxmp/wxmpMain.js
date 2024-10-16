import {FileBox} from "file-box";
import {log} from "wechaty";
import {http} from "../https.js";

/**
 * 获取微信用户信息
 * @param talker 微信用户id
 * @param message 消息
 * @param room 房间
 * @param bot 机器人
 */
export const getUserInfo = (talker, message, room, bot) => {
    let str = "信息：\n";
    str += "id: " + talker.id + "\n"
    str += "用户昵称: " + talker.name() + "\n"
    str += "城市: " + talker.province() + talker.city() + "\n"
    str += "签名: " + talker.payload.signature + "\n"
    room.say(str)
    talker.avatar().then(avatar => {
        if (avatar.buffer.length > 0) {
            let fileBox = FileBox.fromBuffer(avatar.buffer,"avatar.png")
            room.say(fileBox)
        }
    });
}
/**
 * 获取微信用户信息
 * @param talker 微信用户id
 * @param message 消息
 * @param room 房间
 * @param bot 机器人
 */
export const getAuthUserInfo = (talker, message, room, bot) => {

    let params = {
        state: "http://127.0.0.1:3000/resUserinfo"
    }
    http("https://wxopen.frp.chrelyonly.cn/wx-mp/getCode", "get", params, 1, {}).then(res => {
        // 截取base64文件的内容
        let base64 = res.data.data.replace(/^data:image\/\w+;base64,/, "");
        const fileBox = FileBox.fromBase64(base64, "qr.png")
        room.say(fileBox)
    })
}
/**
 * 回调用户信息
 * @param request 请求
 * @param bot 机器人
 */
export const resUserinfo = (request, bot) => {
    log.info('回调用户信息')
    return new Promise((success, error) => {
        bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
            if (room) {
                let msg = "信息: \n";
                msg += "昵称: " + request.body.data.nickname + "\n"
                msg += "unionId: " + request.body.data.unionid + "\n"
                msg += "openid: " + request.body.data.openid + "\n"
                room.say(msg)
                const fileBox = FileBox.fromUrl(request.body.data.headimgurl, "1.png")
                room.say(fileBox).then(res => {
                    success("发送成功")
                })
            }
        })
    })
}
