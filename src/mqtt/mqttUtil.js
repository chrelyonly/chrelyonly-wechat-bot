/**
 * mqtt消息
 * @param topic 订阅
 * @param message 消息
 * @param userId 我自己id
 * @param bot 机器人
 */
const mqttMessage = (topic, message, userId, bot) => {
    if (topic === "/onlineUserNum") {
        console.log("在线人数:" + message.toString());
        msgUtil(bot,"当前在线人数:" + message.toString())
    }
    if (topic.includes("/userId" + userId)) {
        msgUtil(bot,"收到其他机器人消息:" + message.toString())
    }
    if (topic.includes("/wechatRun")) {
        msgUtil(bot,"wechatRun:" + message.toString())
    }
}

const msgUtil = (bot,msg)=> {
    bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
        if (room) {
            room.say(msg)
        }
    })
}
