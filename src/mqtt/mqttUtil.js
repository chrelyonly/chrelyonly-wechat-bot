
/**
 * 机器人id list 用于发消息时判断是否是机器人,防止机器人互相发消息
 * 集群id 从远端获取
 * @type {*[]}
 */
export const botList = []

/**
 * mqtt消息
 * @param topic 订阅
 * @param message 消息
 * @param userId 我自己id
 * @param bot 机器人
 */
export const mqttMessage = (topic, message, userId, bot) => {
    if (topic.includes("/onlineUserNum")) {
        // console.log("刷新在线人数")
        let userInfo = JSON.parse(message.toString())
        // msgUtil(bot,"当前在线人数:" + userInfo.count)
    //   去重然后存入userInfo.id
        if (!botList.includes(userInfo.id)) {
            botList.push(userInfo.id)
        }
    }
    if (topic.includes("/userId" + userId)) {
        // console.log("收到其他机器人消息")
        msgUtil(bot,"收到其他机器人消息:" + message.toString())
    }
    if (topic.includes("/wechatRun" + userId)) {
        // console.log("wechatRun")
        msgUtil(bot,"wechatRun:" + message.toString())
    }
    if (topic.includes("/oauth")) {
        console.log("oauth")
    }
}

const msgUtil = (bot,msg)=> {
    bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
        if (room) {
            room.say(msg)
        }
    })
}
