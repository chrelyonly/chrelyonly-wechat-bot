
// 扫码
import {log, ScanStatus} from "wechaty";
import qrTerminal from "qrcode-terminal";
// 引入缓存工具
import {getCache, setCache} from "../util/cacheUtil.js";
import {FileBox} from "file-box";
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
export async  function onMessage(message,bot) {
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
            // 6 是图片
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

                // 如果缓存包含测试字符串则发送视频
                // if (msg.toString().includes("来点视频")){
                //     // 生成1到10之间的随机整数
                //     let randomNumber = Math.floor(Math.random() * 10) + 1;
                //     const fileBox = FileBox.fromFile("C:\\Users\\chrelyonly\\Downloads\\testqqq\\" + randomNumber + ".jpg")
                //     room.say(fileBox)
                // }
                //
                // if (msg.toString().includes("来点真视频")){
                //     // 生成1到10之间的随机整数
                //     let randomNumber = Math.floor(Math.random() * 4) + 1 + 10;
                //     const fileBox = FileBox.fromFile("C:\\Users\\chrelyonly\\Downloads\\testqqq\\" + randomNumber + ".mp4")
                //     room.say(fileBox)
                // }
                //     执行复读机,复读机只复读文字消息
                // room.say(message.text() + "\n-测试")
            }
            if(txtType === 13){
            //     撤回事件
                let text = msg;
                // console.log("撤回消息")
                // console.log(text)
                // 获取撤回的消息id,获取旧oldmsgid的值
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
