import {FileBox} from "file-box";
import {http} from "./https.js";
import {apiList} from "../config/apiList.js";
import {getWaterGroupsWin} from "./waterGroupsUtil.js";
import {textToVideo} from "./textToVideo/textToVideo.js";

// 自定义更据消息回复事件
export function myOnMessage(message,room, bot) {
    // 判断是否机器人自己发送的
    if (message.self()) {
        return;
    }
    // 根据消息内容回复
    let text = message.text();
    // 获取发送者
    let talker = message.talker()
    if (text.toString().includes("#菜单")) {
        let menu = "菜单：\n";
        for (let i = 0; i < getAllApiName().length; i++) {
            menu += (i + 1) + "." + getAllApiName()[i] + "\n";
        }
        room.say(menu)
        return;
    }
    // 水群王
    if (text.toString().includes("#水群王")) {
        getWaterGroupsWin(room,bot)
        return;
    }
    // 语音合成
    if (text.toString().includes("#语音合成")) {
        let msg = text.replace("#语音合成","")
        textToVideo(room,bot,msg).then( res=> {
            const fileBox = FileBox.fromBuffer(res, "1.wav")
            room.say(fileBox)
        },error=>{
            room.say(error)
        })
        return;
    }
    let apiItem = getApi(text);
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
            nameList.push(apiList[i].des)
        }else{
            nameList.push(apiList[i].name)
        }
    }
    return nameList;
}
const getApi = (name) => {
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
    return null;
}
