import "./newdate.js";
import {FileBox} from "file-box";
import {log} from "wechaty";

log.info(new Date().Format("hh:mm:ss"))
const listTime = [
    "00:00:00",
    // "01:00:00",
    // "02:00:00",
    // "03:00:00",
    // "04:00:00",
    // "05:00:00",
    // "06:00:00",
    // "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
    "21:00:00",
    "22:00:00",
    "23:00:00"
]

// // 判断时间是否到点啦
export const isTimeTo = (bot) => {
    const now = new Date().Format("hh:mm:ss");
    if (listTime.includes(now)) {
        saveTime(bot);
    }
}

const saveTime = (bot) => {
    // waterGroups@@91d480af5b0828d3e4681c58de53a218d5a4026a92e0d6e643a212dd4fb6ff6820240513.json
    // const roomList = await bot.Room.find()
    // const roomList = await bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'})
    // promise实现
    // 寻找指定群
    bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
        if (room) {
            const now = new Date().Format("hh");
            // room.say(now)
            const fileBox = FileBox.fromFile("./src/static/img/point/" + now + ".png")
            room.say(fileBox)

        }
    })
}

