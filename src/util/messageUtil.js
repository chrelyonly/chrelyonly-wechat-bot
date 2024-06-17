import {FileBox} from "file-box";
import {http} from "./https.js";
import {apiList} from "../config/apiList.js";
import {getWaterGroupsWin, saveWaterGroups} from "./waterGroupsUtil.js";
import {textToVideo} from "./textToVideo/textToVideo.js";
import {pluginsInit} from "./plugins/pluginMain.js";
import {getUserInfo} from "./wxmp/wxmpMain.js";
import {douyinVideo} from "./douyinVideo/douyinVideo.js";
import {r18} from "./r18/r18.js";

// 自定义更据消息回复事件
export function myOnMessage(roomName,message,room, bot) {
    // 根据消息内容回复
    let text = message.text();
    // 获取发送者
    let talker = message.talker()
    if (text.includes("#菜单")) {
        let menu = "菜单：\n";
        for (let i = 0; i < getAllApiName().length; i++) {
            menu += (i + 1) + "." + getAllApiName()[i] + "\n";
        }
        room.say(menu)
        return;
    }
    // 表情包制作接口
    pluginsInit(message,room,bot)
    // 获取所有接口名称
    if (text.includes("#获取信息A")) {
        getUserInfo(talker,message,room,bot)
    }
    // 微信公众号授权 这个暂时不用
    // if (text.includes("#获取信息B")) {
    //     getAuthUserInfo(talker,message,room,bot)
    //     return;
    // }
    // 抖音视频解析
    if (text.includes("抖音") && text.includes("v.douyin.com")) {
        douyinVideo(talker,text,room,bot)
    }
    // youtube解析, 这个有点问题,等待找个新接口
    // if (text.includes("youtu.be") || text.includes("www.youtube.com")) {
    //     youtubeVideo(talker,text,room,bot)
    //     return;
    // }
    // 涩图
    if (text.includes("涩图")) {
        r18(room,bot)
    }
    // 水群王
    if (text.includes("#水群王")) {
        getWaterGroupsWin(room,bot,10)
    }
    // 水群王
    if (text.includes("#全部水群王")) {
        getWaterGroupsWin(room,bot,null)
    }
    // redis
    if (text.includes("redis")) {
        let msg = "redis下载地址: \nhttp://47.102.159.60:11725/down/rrj4eGHz0nlx?fname=/";
        room.say(msg)
    }
    // minio
    if (text.includes("minio")) {
        let msg = "minio下载地址: \nhttp://47.102.159.60:11725/down/d4oJSZCSqMLD";
        room.say(msg)
    }
    // windows
    if (text.includes("windows")) {
        let msg = "windows停用更新软件\n下载地址: \nhttp://47.102.159.60:11725/down/pSl2GTFvWRBs";
        room.say(msg)
    }
    // CE
    if (text.includes("CE")) {
        let msg = "CE\n下载地址: \nhttp://47.102.159.60:11725/down/CCSgFbl46m5l";
        room.say(msg)
    }
    // 抓包
    if (text.includes("抓包")) {
        let msg = "抓包软件\n下载地址: \nhttp://47.102.159.60:11725/down/JkLs3RFwsWg1";
        room.say(msg)
    }
    // ssl
    if (text.includes("ssl")) {
        let msg = "ssl申请工具\n食用教程\nhttps://temp-img.chrelyonly.cn/ssl\n下载地址: \nhttp://47.102.159.60:11725/down/XWm4GaT0AELA";
        room.say(msg)
    }
    // 软通牒
    if (text.includes("uiso") || text.includes("软通牒")) {
        let msg = "uiso下载地址: \nhttp://47.102.159.60:11725/down/iJNz3Pkbj7wK";
        room.say(msg)
    }
    // navicat
    if (text.includes("navicat")) {
        let msg = "navicat激活工具下载地址: \nhttp://47.102.159.60:11725/down/QspoSUpIKQKL";
        room.say(msg)
    }
    // jrebel
    if (text.includes("jrebel")) {
        let msg = "jrebel激活工具下载地址: \nhttp://47.102.159.60:11725/down/d8spIutME3sk";
        room.say(msg)
    }
    // idea
    if (text.includes("idea")) {
        let msg = "idea下载地址: \nhttps://107service-cf-cdn.542bsb.top/ideaIU-2024.1.2.win.zip";
        room.say(msg)
    }
    // idea
    if (text.includes("idea")) {
        let msg = "idea下载地址: \nhttps://107service-cf-cdn.542bsb.top/ideaIU-2024.1.2.win.zip";
        room.say(msg)
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
            getWaterGroupsWin(room,bot,10)
        },5000)
    }
    if (text.includes("#我不当水群王")) {
        let number = text.split("#我不当水群王")[1]
        // 判断number是否是数字
        if (isNaN(number)){
            number = -100
        }
        if (+number < 0){
            number = -100
        }else{
            number = -number
        }
        saveWaterGroups(roomName,room,talker,number)
        setTimeout(() => {
            getWaterGroupsWin(room,bot,10)
        },5000)
    }
    // 语音合成
    if (text.includes("#语音合成")) {
        let msg = text.replace("#语音合成","")
        textToVideo(room,bot,msg).then( res=> {
            const fileBox = FileBox.fromBuffer(res, "1.mp3")
            room.say(fileBox)
        },error=>{
            room.say(error)
        })
    }
    if(text.includes("docker")){
        let msg = "docker镜像地址:\n";
        msg += "https://docker.542bsb.top\n"
        msg += "https://107service-cf-cdn.542bsb.top\n"
        msg += "食用教程: docker pull ubuntu:latest 替换为 https://docker.542bsb.top/ubuntu:latest\n"
        room.say(msg)
    }
    if(text.includes("拉尔戈")){
        const fileBox = FileBox.fromFile("./src/static/img/dnf/1716433273045.jpg")
        room.say(fileBox)
    }
    if(text === "?"){
        room.say("捏寄个问号是神魔意思?")
    }
    // 有趣的api
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
                weatherStr += "\n城市：" + data.current.city + "\n"
                weatherStr += "天气：" + data.current.weather + "\n"
                weatherStr += "温度：" + data.current.temp + "\n"
                weatherStr += "风向：" + data.current.wind + "\n"
                weatherStr += "风向等级：" + data.current.windSpeed + "\n"
                weatherStr += "湿度：" + data.current.humidity + "\n"
                room.say(weatherStr,talker)
            }else if (apiItem.type === 16) {
                room.say(res.data.msg,talker)
            }
        },e=>{
            room.say("接口异常: " + e.msg)
        }).catch(e=>{
            room.say("接口异常: " + e.msg)
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
