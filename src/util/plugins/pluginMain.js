// 加载表情插件
import {emojiApi} from "./emoticon/emojiApi.js";
import {getMenu, sendApi} from "./emoticon/emoticon.js";
/**
 * 插件初始化
 * @param message 消息体
 * @param room 房间号
 * @param bot 机器人实例
 */
export const pluginsInit = (message,room,bot) => {
    // 判断是否包含关键字
    // 根据消息内容回复
    let text = message.text();
    // 暂时不区分明令
    // if(text.toString().includes("#表情插件") && text.toString().includes(v.keywords)){
    //     emojiPlugin()
    // }
    if (text.toString().includes("菜单")){
        getMenu("菜单",room,bot);
        return;
    }
    for (const v of Object.values(emojiApi)){
        // 暂时不区分明令
        if(text.toString().includes(v.keywords)){
            let newMsg = text.toString().replace(v.keywords,"");
            if (newMsg === ""){
                newMsg = "1172576293"
            }
            emojiPlugin(v,room,bot,newMsg)
        }
    }
}
/**
 * 表情插件
 */
const emojiPlugin = (item,room,bot,text) => {
    sendApi(item,room,bot,text)
}
