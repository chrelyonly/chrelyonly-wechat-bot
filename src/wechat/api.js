// 扫码
import {log, ScanStatus} from "wechaty";
import qrTerminal from "qrcode-terminal";
// 引入缓存工具
// import {getCache, setCache} from "../util/cacheUtil.js";
import {mqttMain} from "../mqtt/mqttMain.js";
// 改用sqlite数据库
import {saveChatHistory, selectChatHistory} from "../sqlite/waterKing/wechatKingSqlDbUtil.js";
import {FileBox} from "file-box";
import {myOnMessage} from "../util/messageUtil.js";
import {saveWaterGroups} from "../util/waterGroupsUtil.js";
import {botList} from "../mqtt/mqttUtil.js";
// 机器人状态
let botStatus = "on";
export function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        // 在控制台显示二维码
        qrTerminal.generate(qrcode, {small: true})
        log.info('等待扫码:', ScanStatus[status], status)
    } else {
        log.info('已扫码,请确认登录: %s(%s)', ScanStatus[status], status)
    }
}

// 登录
export function onLogin(user, bot) {
//保存token以便下次登录
    log.info(`${user} 登陆成功`)
// mqtt服务器
    mqttMain(bot);
}

// 登录
export function roomTopic(room, topic, oldTopic, changer) {
    log.info(`群 ${room.topic()} 修改名称,旧名称 ${oldTopic} 新名称 ${topic} 来自 ${changer.name()}`)
}

/**
 * 消息监听
 */
export function onMessage(message, bot) {
    // 判断是否机器人自己发送的
    if (message.self()) {
        return;
    }
    // 消息类型是否为文本
    const txtType = message.type()
    // 获取发送者
    let talker = message.talker()
    //
    // let roomNew = message.room()
    // roomNew.topic().then(function (res) {
    //     // 定义支持的群
    //     if (!res.toString().includes("🍓酱の后🌸园  SVIP内部群1")){
    //         // 不支持的群
    //         log.info("不支持的群")
    //         return;
    //     }
    //     if (txtType === 13) {
    //         message.toRecalled().then( res2=> {
    //             roomNew.say(res2)
    //         })
    //     }
    //     let msg = message.text();
    //     if (msg === "头像") {
    //         // roomNew.say(`https://wx.qlogo.cn/${talker.payload.avatar}&type=big`)
    //         // talker.avatar().then(res2 => {
    //         //     // console.log(res)
    //         //     roomNew.say(res2)
    //         // });
    //     }
    // })
    // return;
    // 判断是否是机器人消息
    if (botList.includes(talker.id)) {
        log.info("自己说话,不处理")
        return;
    }
    // 判断是否是群消息  获取发送群
    let room = message.room();
    if (room) {
        //     判断群名称
        room.topic().then(function (res) {
            // 定义支持的群
            // if (!res.toString().includes("🍓酱の后🌸园  SVIP内部群1")){
            //     // 不支持的群
            //     log.info("不支持的群")
            //     return;
            // }
            let msg = message.text();
            if (msg === "") {
                //    不支持的消息类型
                log.info("不支持的消息类型")
                return;
            }
            // 保存水群次数
            saveWaterGroups(res, room, talker, 1)
            // log.info('消息id:',message.id)
            // log.info('消息类型:',txtType)
            // log.info('群名称:',res + ",收到群消息:" + talker.name() + ",他/她/它说:" + msg)



            if(msg === "开机"){
                botStatus = "on";
                room.say("起床床啦\n当前时间:\n" + new Date().Format("yyyy-MM-dd HH:mm:ss"))
                return;
            }
            if(msg === "关机"){
                botStatus = "off";
                room.say("睡觉觉啦\n当前时间:\n" + new Date().Format("yyyy-MM-dd HH:mm:ss"))
                return;
            }
            // 判断机器人状态
            if(botStatus === "off"){
                return;
            }

            // 6 正常发送的图片
            if (txtType === 6) {
                // 保存缓存
                message.toFileBox().then(function (res) {
                    // 保存数据库
                    saveChatHistory(room.id,res,talker.id,talker.name(),message.id, 6, res.buffer.toString("base64")).then(r => {
                        // log.info(r)
                    })
                })
            }
            // 5 是收藏表情,不知如何解密微信的表情包连接
            if (txtType === 5) {
                // 保存缓存
                // message.toFileBox().then(function (res) {
                // res.toBuffer().then(res2 => {
                //     log.info(res2)
                // })
                // res.toFile(res.name).then(res2 => {
                //     log.info(res2)
                // })
                // let cacheJson = {
                //     type: 5,
                //     text: res.buffer.toString("base64")
                // }
                // setCache(message.id,JSON.stringify(cacheJson))
                // })
            }
            // 7是文本
            if (txtType === 7) {
                // 保存数据库
                saveChatHistory(room.id,res,talker.id,talker.name(),message.id, 7, msg)
                // 自定义文本回复内容
                myOnMessage(res, message, room, bot)
            }
            if (txtType === 13) {
                let text = msg;
                let reg = /<msgid>(.*?)<\/msgid>/;
                let result = reg.exec(text);
                if (result) {
                    // 获取撤回的消息的id
                    let oldmsgid = result[1]
                    // 从缓存中获取消息
                    selectChatHistory(oldmsgid).then(messageInfo => {
                        if (messageInfo) {
                            // 由于是xml格式,获取replacemsg的值
                            reg = /<replacemsg><!\[CDATA\[(.*?)]]><\/replacemsg>/;
                            result = reg.exec(text);
                            if (result) {
                                text = result[1]
                            }
                            // 回复文本
                            if (messageInfo.type === "7") {
                                room.say(text + ",撤回的消息是:[ " + messageInfo.text + " ]")
                            }
                            // // 回复表情包
                            if (messageInfo.type === "5") {
                                // 从xml中解析图片地址
                                let base64 = messageInfo.text;
                                let fileBox = FileBox.fromBase64(base64, "temp.gif");
                                room.say(fileBox)
                            }
                            // 回复图片
                            if (messageInfo.type === "6") {
                                // 从xml中解析图片地址
                                let base64 = messageInfo.text;
                                let fileBox = FileBox.fromBase64(base64, "temp.png");
                                room.say(text + ",撤回的消息是:")
                                room.say(fileBox)
                            }
                        }
                    })
                }
            }
        })

    } else {
        log.info('收到个人消息')
    }
}

/**
 * 失败操作
 */
export function onError(msg) {
    // log.info("启动失败,请检查是否实名,是否绑定手机号,是否绑定银行卡")
    log.info(msg)
    // 停止node
    // process.exit()
}
