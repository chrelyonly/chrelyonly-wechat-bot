// 导入微信包
import {WechatyBuilder,log} from 'wechaty'
import {onError, onLogin, onMessage, onScan, roomTopic} from "./wechat/api.js";

// 初始化机器人
const bot = WechatyBuilder.build({
    name: "cm",
})

// 扫码
bot.on('scan', onScan)
// 登录
bot.on('login', onLogin)
// 修改群名称
bot.on('room-topic', roomTopic)
// 异常
bot.on('error', onError)
// 收到消息
bot.on('message', async message => {
    await onMessage(message, bot)
})
    bot
        .start()
        .then(() => {
            log.info('启动成功')
        },err=>{
            log.info('启动失败')
            console.log(err)
        })
        .catch((e) => {
            log.info("启动失败")
            console.error(e)
        })