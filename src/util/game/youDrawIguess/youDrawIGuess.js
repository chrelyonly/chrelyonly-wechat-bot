import {log} from "wechaty";
import {FileBox} from "file-box";

/**
 * 答案
 */
export let answer = "";
/**
 * 题目
 * @type {string}
 */
export let answerImg = "";
/**
 * 用户列表
 */
export let userList = [];

/**
 * 游戏状态
 * @type {number}
 * 0未开始
 * 1等待人员加入
 * 2等待画图
 * 3等待猜图
 */
export let gameStatus = 0;
/**
 * 你画我猜小游戏
 */
export const youDrawIGuess = (message, room, bot, text) => {
    log.info('你画我猜小游戏')
    if (gameStatus === 0) {
        room.say("你画我猜已发起，快来加入吧~\n输入:加入你画我猜")
        gameStatus = 1
    } else {
        room.say("你画我猜已发起,请勿重复发起!\n输入:加入你画我猜")
    }
}
/**
 * 加入你画我猜小游戏
 */
export const joinYouDrawIGuess = (message, room, bot, text) => {
    log.info('加入游戏')
    // 获取发送者
    let talker = message.talker()
    if (gameStatus === 1) {
        //     判断是否已经加入
        userList.forEach((item) => {
            if (item.id === talker.id) {
                room.say("你已经加入游戏,快去叫别人来玩", talker)
                return
            }
        })
        // 加入游戏
        userList.push(talker)
        //     当前人数
        room.say("加入游戏成功,当前人数: " + userList.length + "人,大家快来玩呀~")
    } else if (gameStatus === 1) {
        room.say("游戏已经开始,哼哼啊啊啊啊啊啊啊")
    } else {
        room.say("游戏未开始,请稍后再试")
    }
}

/**
 * 开始你画我猜小游戏
 */
export const startYouDrawIGuess = (message, room, bot, text) => {
    log.info('开始你画我猜小游戏')
    if (gameStatus === 1) {
        // 状态修改为开始 等待画图
        gameStatus = 2;
        room.say("游戏开始,等待画画")
    } else {
        room.say("游戏未开始,哼哼啊啊啊啊啊啊啊")
    }
}
/**
 * 结束画图
 */
export const okDraw = (request, bot) => {
    log.info('结束画图')
    return new Promise((success, error) => {
        bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
            if (room) {
                if (gameStatus === 2) {
                    // 状态修改为等待猜图
                    gameStatus = 3;
                    answer = request.body.answer
                    answerImg = request.body.answerImg
                    // 截取base64文件的内容
                    let base64 = answerImg.replace("data:image/png;base64,", "");
// 将Base64字符串转换为Buffer对象
//                 let buffer = Buffer.from(base64, 'base64');
                    const fileBox = FileBox.fromBase64(base64, "1.gif")
                    room.say(fileBox)
                    room.say("已经画好图啦!快猜吧~")
                } else {
                    room.say("还没到你画图呢,哼哼啊啊啊啊啊啊啊")
                }
            }
        })
    })
}
/**
 * 猜图片
 */
export const iGuess = (message, room, bot, text) => {
    log.info('我猜')
    // 获取发送者
    let talker = message.talker()
    if (gameStatus === 3) {
        if (text.toString().includes(answer)) {
            room.say("恭喜" + talker.name() + "猜对了,答案是: " + answer + ",本轮游戏结束!", talker)
            gameStatus = 0;
        }
    } else {
        room.say("游戏未开始,哼哼啊啊啊啊啊啊啊")
    }
}
