import {FileBox} from "file-box";
import {http} from "./https.js";
import {apiList} from "../config/apiList.js";
import {getWaterGroupsWin, saveWaterGroups} from "./waterGroupsUtil.js";
import {textToVideo} from "./textToVideo/textToVideo.js";
import {pluginsInit} from "./plugins/pluginMain.js";
import {getAuthUserInfo, getUserInfo} from "./wxmp/wxmpMain.js";
import {youDrawIGuess} from "./game/youDrawIguess/youDrawIGuess.js";
import {douyinVideo} from "./douyinVideo/douyinVideo.js";
// 导入插件
// import {apps} from "./plugins/index.js";

// 自定义更据消息回复事件
export function myOnMessage(roomName,message,room, bot) {
    // 判断是否机器人自己发送的
    if (message.self()) {
        return;
    }
    // 根据消息内容回复
    let text = message.text();
    // 获取发送者
    let talker = message.talker()
    // if (text.toString().includes("你画我猜")) {
    //     youDrawIGuess(message, room, bot, text)
    // }
    // if (text.toString().includes("#插件")) {
    // 插件接口
    pluginsInit(message,room,bot)
        // return;
    // }
    if (text.toString().includes("#获取信息A")) {
        getUserInfo(talker,message,room,bot)
        return;
    }
    if (text.toString().includes("#获取信息B")) {
        getAuthUserInfo(talker,message,room,bot)
        return;
    }
    // 抖音视频解析
    if (text.toString().includes("抖音") && text.toString().includes("v.douyin.com")) {
        douyinVideo(talker,message,room,bot)
        return;
    }
    if (text.toString().includes("#菜单")) {
        let menu = "菜单：\n";
        for (let i = 0; i < getAllApiName().length; i++) {
            menu += (i + 1) + "." + getAllApiName()[i] + "\n";
        }
        room.say(menu)
        return;
    }
    // 水群王
    if (text.includes("#水群王")) {
        getWaterGroupsWin(room,bot)
        return;
    }
    // 水群王
    if (text.includes("#我要当水群王")) {
        let number = text.split("#我要当水群王")[1]
        // 判断number是否是数字
        if (isNaN(number)){
            number = 10
        }
        if (+number < 0){
            number = 10
        }
        saveWaterGroups(roomName,room,talker,number)
        setTimeout(() => {
            getWaterGroupsWin(room,bot)
        },5000)
        return;
    }
    if (text.includes("#我不当水群王")) {
        let number = text.split("#我不当水群王")[1]
        // 判断number是否是数字
        if (isNaN(number)){
            number = -100
        }
        if (+number > 0){
            number = -100
        }
        saveWaterGroups(roomName,room,talker,number)
        setTimeout(() => {
            getWaterGroupsWin(room,bot)
        },5000)
        return;
    }
    // 语音合成
    if (text.toString().includes("#语音合成")) {
        let msg = text.replace("#语音合成","")
        textToVideo(room,bot,msg).then( res=> {
            const fileBox = FileBox.fromBuffer(res, "1.mp3")
            room.say(fileBox)
        },error=>{
            room.say(error)
        })
        return;
    }
    let apiItem = getApi(text,room);
    if (apiItem){
        // 定义参数
        let params = {}
        // 不同接口的请求参数不同单独区分一下,9点歌 点歌有两步骤,单独判断下
        if (apiItem.type === 9){
            //musicjx.com/
            let n = null;
            // 判断是否包含#号 包含就是点歌
            if (apiItem.msg.includes("#")){
                let arr = apiItem.msg.split("#")
                apiItem.msg = arr[0]
                n = arr[1]
            }
            params = {
                key: 'Sbk3cZM1WUlulr6Trgd',
                msg: apiItem.msg,
                n: n,
            }
        }else{
            params = {
                "QQ": apiItem.msg,
                "name": apiItem.msg,
                "msg": apiItem.msg,
                "city": apiItem.msg,
                // 类型12时拼接qq头像地址
                "url": apiItem.type === 12?"https://qlogo2.store.qq.com/qzone/" + apiItem.msg + "/" + apiItem.msg + "/100":null,
                "prompt": apiItem.msg,
                // 结构一下默认自带参数
                ...apiItem.params,
            }
        }
        http(apiItem.url,apiItem.requestMethod,params,apiItem.requestType,apiItem.headers).then( res => {
            if (apiItem.type === 1) {
                room.say(res.data.data,talker)
            } else if (apiItem.type === 2) {
                room.say(res.data.data.output,talker)
            } else if (apiItem.type === 3) {
                const fileBox = FileBox.fromBuffer(res.data, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 4) {
                const fileBox = FileBox.fromUrl(res.data.text, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 5) {
                const fileBox = FileBox.fromUrl(res.data.data.image, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 6) {
                const fileBox = FileBox.fromUrl(res.data.data.data[0], "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 7) {
                room.say(res.data,talker)
            } else if (apiItem.type === 8) {
                const fileBox = FileBox.fromBuffer(res.data, "1.gif")
                room.say(fileBox)
            } else if (apiItem.type === 9) {
                //点歌专用
                // 获取数据连接
                try {
                    if (res.data.data.text){
                        room.say(res.data.data.text + "\n通过#号点歌可以选择播放次数\n如：歌曲名#3")
                        return;
                    }
                    let url = res.data.data.url
                    let params = {

                    }
                    http(url,"get",params, 3,{}).then(res2 => {
                        if (res2.headers["content-type"].includes("application/json")) {
                            // 还原arraybuffer至msg
                            let data = new TextDecoder("utf-8").decode(res2.data)
                            if (data.code !== 200){
                                room.say(data)
                            }else{
                                room.say(data.data)
                            }
                            return
                        }
                        const fileBox = FileBox.fromBuffer(res2.data,res.data.data.name + "-" + res.data.data.songname + ".mp3")
                        room.say(fileBox)
                    })
                }catch (e){
                    room.say("没有找到相关歌曲:" + e.msg)
                }
            } else if (apiItem.type === 10) {
                room.say(res.data.data.Message,talker)
            } else if (apiItem.type === 11) {
                let params = {

                }
                http(res.data.text,"get",params, 3,{}).then(res2 => {
                    const fileBox = FileBox.fromBuffer(res2.data,"1.gif")
                    room.say(fileBox)
                })
            } else if (apiItem.type === 12) {
                const fileBox = FileBox.fromBuffer(res.data, "1.png")
                room.say(fileBox)
            }else if (apiItem.type === 13) {
                room.say(res.data.data.Msg, talker)
            }else if (apiItem.type === 14) {
                const fileBox = FileBox.fromStream(res.data, "1.png")
                room.say(fileBox)
            }else if (apiItem.type === 15) {
                let weatherStr = "";
                let data = res.data.data
                weatherStr += "城市：" + data.current.city + "\n"
                weatherStr += "天气：" + data.current.weather + "\n"
                weatherStr += "温度：" + data.current.temp + "\n"
                weatherStr += "风向：" + data.current.wind + "\n"
                weatherStr += "风向等级：" + data.current.windSpeed + "\n"
                weatherStr += "湿度：" + data.current.humidity + "\n"
                room.say(weatherStr,talker)
            }else if (apiItem.type === 16) {
                room.say(res.data.msg,talker)
            }
        })
    }
}


const getAllApiName = () => {
    let nameList = []
    for (let i = 0; i < apiList.length; i++) {
        if(apiList[i].des){
            nameList.push("#" + apiList[i].des)
        }else{
            nameList.push("#" + apiList[i].name)
        }
    }
    return nameList;
}
const getApi = (name,room) => {
    if(name === "?"){
        room("捏寄个问号是神魔意思")
        return null;
    }
    if(name.includes("拉尔戈")){
        const fileBox = FileBox.fromFile("./src/static/img/dnf/1716433273045.jpg")
        room.say(fileBox)
        return null;
    }
    if(name.includes("#")){
        for (let i = 0; i < apiList.length; i++) {
            let item = apiList[i]
            if (name.includes(item.name)){
                item.msg = name.split(item.name)[1].trim()
                if (!item.msg.trim()){
                    item.msg = "1172576293"
                }
                return item;
            }
        }
    }
    return null;
}
