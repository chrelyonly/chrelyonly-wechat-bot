import {http} from "../https.js";
import {FileBox} from "file-box";
// 解释正则
const readRegex = /<div class="tab-content">(.*?)<\/div>/s;
// 笔画正则
const writeRegex = /https:\/\/hanyu-word-gif\.cdn\.bcebos\.com\/[^\s'"]+/;

// 怎么读
export const chineseTxtRead = (room,bot,message) => {
    let params = {
        wd: message,
        ptype: "zici"
    }
    http("https://hanyu.baidu.com/s","get",params,1,{}).then( res => {
        const match = res.data.match(writeRegex);
        if (match) {
            const text = match[match.length-1].replace(/<[^>]*>/g, '').trim(); // 去掉任何HTML标签
            room.say(text)
        }
    })
}

// 怎么写
export const chineseTxtWrite = (room,bot,message) => {
    let params = {
        wd: message,
        ptype: "zici"
    }
    http("https://hanyu.baidu.com/s","get",params,1,{}).then( res => {
        const match = res.data.match(readRegex);
        if (match) {
            const fileBox = FileBox.fromUrl(match[0], {name:"chineseTxtRead" + message + new Date().Format("yyyy-MM-dd HH:mm:ss")});
            room.say(fileBox)
        }
    })
}
