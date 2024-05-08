
// 扫码
import {log, ScanStatus} from "wechaty";
import qrTerminal from "qrcode-terminal";
// 引入缓存工具
import {getCache, setCache} from "../util/cacheUtil.js";
import {FileBox} from "file-box";
import {myOnMessage} from "../util/messageUtil.js";
export function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        // 在控制台显示二维码
        qrTerminal.generate(qrcode, { small: true })
        log.info('等待扫码:', ScanStatus[status], status)
    } else {
        console.log('已扫码,请确认登录: %s(%s)', ScanStatus[status], status)
    }
}
// 登录
export function onLogin(user) {
//保存token以便下次登录
    log.info(`${user} 登陆成功`)
}
// 登录
export function roomTopic(room, topic, oldTopic, changer) {
    console.log(`群 ${room.topic()} 修改名称,旧名称 ${oldTopic} 新名称 ${topic} 来自 ${changer.name()}`)
}
/**
 * 消息监听
 */
export  function onMessage(message,bot) {
    // 消息类型是否为文本
    const txtType = message.type()
    // 获取发送者
    let talker = message.talker()
    // 判断是否是群消息  获取发送群
    let room = message.room();
    if (room) {
        //     判断群名称
        room.topic().then(function (res) {
            let msg = message.text();
            if (msg === ""){
            //    不支持的消息类型
                log.info("不支持的消息类型")
                return;
            }
            log.info('消息id:',message.id)
            log.info('消息类型:',txtType)
            log.info('群名称:',res + ",收到群消息:" + talker.name() + ",他/她/它说:" + msg)
            // 6 正常发送的图片
            if(txtType === 6){
                // 保存缓存
                message.toFileBox().then(function (res) {
                    let cacheJson = {
                        type: 6,
                        text: res.buffer.toString("base64")
                    }
                    setCache(message.id,JSON.stringify(cacheJson))
                })
            }
            // 5 是收藏表情,不知如何解密微信的表情包连接
            // if(txtType === 5){
            //     // 保存缓存
            //     message.toFileBox().then(function (res) {
            //         let cacheJson = {
            //             type: 5,
            //             text: res.remoteUrl
            //         }
            //         setCache(message.id,JSON.stringify(cacheJson))
            //     })
            // }
            // 7是文本
            if(txtType === 7){
                // 保存缓存
                let cacheJson = {
                    type: 7,
                    text: msg
                }
                setCache(message.id,JSON.stringify(cacheJson))
                myOnMessage(message,room,bot)

            }
            if(txtType === 13){
                let text = msg;
                let reg = /<msgid>(.*?)<\/msgid>/;
                let result = reg.exec(text);
                if(result){
                    // 获取撤回的消息的id
                    let oldmsgid = result[1]
                    // 从缓存中获取消息
                    let cacheTxt = getCache(oldmsgid)
                    if(cacheTxt){
                        // 由于是xml格式,获取replacemsg的值
                        reg = /<replacemsg><!\[CDATA\[(.*?)]]><\/replacemsg>/;
                        result = reg.exec(text);
                        if(result){
                            text = result[1]
                        }
                        let oldMsg = JSON.parse(cacheTxt)
                        // 回复文本
                        if (oldMsg.type === 7){
                            room.say(text + ",撤回的消息是:[ " + oldMsg.text + " ]")
                        }
                        // // 回复表情包
                        // if (oldMsg.type === 5){
                        //     // 从xml中解析图片地址
                        //     let url = oldMsg.text;
                        //     let fileBox = FileBox.fromUrl(url);
                        //     room.say(fileBox)
                        // }
                        // 回复图片
                        if (oldMsg.type === 6){
                            // 从xml中解析图片地址
                            let base64 = oldMsg.text;
                            let fileBox = FileBox.fromBase64(base64,"temp.png");
                            room.say(text + ",撤回的消息是:")
                            room.say(fileBox)
                        }
                    }
                }
            }
        })

    }else{
        log.info('收到个人消息')
    }
}
/**
 * 失败操作
 */
export function onError(msg) {
    log.info("启动失败,请检查是否实名,是否绑定手机号,是否绑定银行卡")
    log.info(msg)
    // 停止node
    process.exit()
}
