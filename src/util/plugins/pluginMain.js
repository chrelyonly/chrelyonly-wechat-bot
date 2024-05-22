// 加载表情插件
import {sendApi} from "./emoticon/emoticon.js";
import {emojiApi} from "./emoticon/emojiApi.js";

/**
 * 插件初始化
 * @param message 消息体
 * @param room 房间号
 * @param bot 机器人实例
 */
export const pluginsInit = (message,room,bot) => {
    // 判断是否包含关键字
    let text = message.text();
    // 暂时不区分明令
    // if(text.toString().includes("#表情插件") && text.toString().includes(v.keywords)){
    //     emojiPlugin()

    // }
    if (text.toString().includes("插件菜单")){
        getMenu(room,bot);
        return;
    }
    emojiApi.forEach(emoji => {
        if (emoji.match.some(m => text.toString().includes(m))) {
            text = text.toString().replace(emoji.match[0], "");
            getEmoji(emoji, room, bot, text);
        }
    });
}
/**
 * 表情插件
 */
const getEmoji = (item,room,bot,text) => {
    sendApi(item, room, bot, text)
}

const getMenu = (room, bot)=> {
    let msg = "插件菜单: \n";
    for (let i = 0; i < emojiApi.length; i++) {
        msg += i+1 + "." + emojiApi[i].des + "\n";
    }
    room.say(msg)
}
