import {FileBox} from "file-box";
import {http} from "./https.js";
import {apiList} from "../config/apiList.js";
import {getWaterGroupsWin, saveWaterGroups} from "./waterGroupsUtil.js";
import {textToVideo} from "./textToVideo/textToVideo.js";
import {pluginsInit} from "./plugins/pluginMain.js";
import {getUserInfo} from "./wxmp/wxmpMain.js";
import {douyinVideo} from "./douyinVideo/douyinVideo.js";
import {r18} from "./r18/r18.js";
import {exportWaterKingToExcel} from "../sqlite/exportSqliteToExcel.js";
import {checkDnfFree} from "./dnf/dnf.js";
import {vpsMain} from  "./vps/vpsMain.js"
import {myDivMessageResponseMain} from "../sqlite/service/myDivMessageResponseMain.js";
import {getPm2Info} from "./spawn/spawnMain.js";
import {chineseTxtRead, chineseTxtWrite} from "./hanyu/chineseTxtReadMain.js";
import {unifiedVideo} from "./unifiedVideo/unifiedVideo.js";
import {getSystemInfo} from "./systemInfo/systemInfo.js";
import {downloadFile} from "./download/downloadFile.js";
import {caixukun} from "./caixukun/caixukun.js";






// 自定义更据消息回复事件
export function myOnMessage(roomName, message, room, bot) {
    // 根据消息内容回复
    let text = message.text();
    // 获取发送者
    let talker = message.talker()

    // 判断游戏状态
    // if (globalGameStatus){
    //     // 进入游戏
    //     joinGame(message, room, talker,text);
    // }
    if (text.includes("#菜单")) {
        let menu = "菜单：\n";
        for (let i = 0; i < getAllApiName().length; i++) {
            menu += (i + 1) + "." + getAllApiName()[i] + "\n";
        }
        room.say(menu)
        return;
    }
    // 自定义收发接口 来自webapi实现的
    myDivMessageResponseMain(text, room, bot,talker);
    // 表情包制作接口
    let isPluginFlag = pluginsInit(message, room, bot)
    // if(isPluginFlag){
    //     // return;
    // }
    // 获取所有接口名称
    if (text.includes("#获取信息A")) {
        getUserInfo(talker, message, room, bot)
        return;
    }
    // 微信公众号授权 这个暂时不用
    // if (text.includes("#获取信息B")) {
    //     getAuthUserInfo(talker,message,room,bot)
    //     return;
    // }
    // 抖音视频解析
    if (text.includes("v.douyin.com")) {
        douyinVideo(talker, text, room, bot)
        return;
    }
    // youtube解析, 这个有点问题,等待找个新接口
    // if (text.includes("youtu.be") || text.includes("www.youtube.com")) {
    //     youtubeVideo(talker,text,room,bot)
    //     return;
    // }
    if (text.includes("https://www.youtube.com")) {
        unifiedVideo(talker,text,room,bot)
        return;
    }
    // 如果是下载文件指令 并且是3个参数那么则进行下载
    if (text.includes("下载文件") && text.split("--").length >= 3) {
        downloadFile(talker,text,room,bot)
        return;
    }
    // 获取当前设备信息
    if (text.includes("getSystemInfo")) {
        let msg = getSystemInfo(talker,text,room,bot)
        room.say(msg)
        return;
    }
    // 涩图
    if (text.includes("涩图")) {
        r18(room, bot)
        return;
    }
    // 小黑子真过分
    if (text.includes("黑粉") || text.includes("蔡徐坤") || text.includes("坤坤")) {
        caixukun(room)
        return;
    }
    // 汉语拼音
    if (text.includes("怎么读") || text.includes("怎么写") || text.includes("什么意思")) {
        try {
            // 获取第一个文字
            chineseTxtRead(room, bot,text[0])
        }catch(err) {
            // 怎么读功能异常
            console.log(err);
        }
        try {
            chineseTxtWrite(room, bot,text[0])
        }catch(err) {
            // 怎么写功能异常
            console.log(err);
        }
        return;
    }
    // 查询pm2内存状态
    if (text.includes("getPm2Info")) {
        getPm2Info(room, bot)
        return;
    }
    // dnf游戏比例
    if (text.includes("比例")) {
        checkDnfFree(bot,room,1)
        return;
    }
    // 水群王
    if (text.includes("#水群王")) {
        getWaterGroupsWin(room, bot, 10)
        return;
    }
    // redis
    if (text.includes("redis")) {
        let msg = "redis下载地址: \nhttp://47.102.159.60:11725/down/rrj4eGHz0nlx?fname=/";
        room.say(msg)
        return;
    }
    // minio
    if (text.includes("minio")) {
        let msg = "minio下载地址: \nhttp://47.102.159.60:11725/down/d4oJSZCSqMLD";
        room.say(msg)
        return;
    }
    // windows
    if (text.includes("windows")) {
        let msg = "windows停用更新软件\n下载地址: \nhttp://47.102.159.60:11725/down/pSl2GTFvWRBs";
        room.say(msg)
        return;
    }
    // CE
    if (text.includes("CE")) {
        let msg = "CE\n下载地址: \nhttp://47.102.159.60:11725/down/CCSgFbl46m5l";
        room.say(msg)
        return;
    }
    // 抓包
    if (text.includes("抓包")) {
        let msg = "抓包软件\n下载地址: \nhttp://47.102.159.60:11725/down/JkLs3RFwsWg1";
        room.say(msg)
        return;
    }
    // ssl
    // if (text.includes("ssl")) {
    //     let msg = "ssl申请工具\n食用教程\nhttps://temp-img.chrelyonly.cn/ssl\n下载地址: \nhttp://47.102.159.60:11725/down/XWm4GaT0AELA";
    //     room.say(msg)
    //     return;
    // }
    // 软通牒
    if (text.includes("uiso") || text.includes("软通牒")) {
        let msg = "uiso下载地址: \nhttp://47.102.159.60:11725/down/iJNz3Pkbj7wK";
        room.say(msg)
        return;
    }
    // navicat
    if (text.includes("navicat")) {
        let msg = "navicat激活工具下载地址: \nhttp://47.102.159.60:11725/down/QspoSUpIKQKL";
        room.say(msg)
        return;
    }
    // jrebel
    if (text.includes("jrebel")) {
        let msg = "jrebel激活工具下载地址: \nhttp://47.102.159.60:11725/down/d8spIutME3sk";
        room.say(msg)
        return;
    }
    // 打印服务器信息
    // if (text.includes("我的服务器")) {
    //     vpsMain(room)
    //     return;
    // }
    // 水群王
    if (text.includes("#导出聊天记录")) {
        let date = text.split("#导出聊天记录")[1]
        // 校验日期格式
        if (!date || date.length !== 8) {
            room.say("日期格式不正确,请重新输入(yyyyMMdd)")
            return;
        }
        exportWaterKingToExcel(room,date);
        return;
    }
    // 水群王
    if (text.includes("#我要当水群王")) {
        let number = text.split("#我要当水群王")[1]
        // 判断number是否是数字
        if (isNaN(number)) {
            number = 10
        }
        if (+number < 0) {
            number = 10
        }
        saveWaterGroups(roomName, room, talker, number)
        setTimeout(() => {
            getWaterGroupsWin(room, bot, 10)
        }, 5000)
        return;
    }
    if (text.includes("#我不当水群王")) {
        let number = text.split("#我不当水群王")[1]
        // 判断number是否是数字
        if (isNaN(number)) {
            number = -100
        }
        if (+number < 0) {
            number = -100
        } else {
            number = -number
        }
        saveWaterGroups(roomName, room, talker, number)
        setTimeout(() => {
            getWaterGroupsWin(room, bot, 10)
        }, 5000)
        return;
    }
    // 语音合成
    if (text.includes("#语音合成")) {
        let msg = text.replace("#语音合成", "")
        textToVideo(room, bot, msg).then(res => {
            const fileBox = FileBox.fromBuffer(res, "1.mp3")
            room.say(fileBox)
        }, error => {
            room.say(error)
        })
        return;
    }
    if (text.includes("docker")) {
        let msg = "docker镜像地址:\n";
        msg += "https://docker.1ms.run\n"
        msg += "实测好用到爆"
        room.say(msg)
        return;
    }
    if (text.includes("拉尔戈")) {
        const fileBox = FileBox.fromFile("./src/static/img/dnf/1716433273045.jpg")
        room.say(fileBox)
        return;
    }
    if (text === "?") {
        room.say("捏寄个问号是神魔意思?")
        return;
    }
    // 有趣的api
    let apiItem = getApi(text, room);
    if (apiItem) {
        // 定义参数
        let params = {}
        // 不同接口的请求参数不同单独区分一下,9点歌 点歌有两步骤,单独判断下
        if (apiItem.type === 9) {
            //musicjx.com/
            let n = null;
            // 判断是否包含#号 包含就是点歌
            if (apiItem.msg.includes("#")) {
                let arr = apiItem.msg.split("#")
                apiItem.msg = arr[0]
                n = arr[1]
            }
            params = {
                key: 'Sbk3cZM1WUlulr6Trgd',
                msg: apiItem.msg,
                n: n,
            }
        } else {
            params = {
                "QQ": apiItem.msg,
                "name": apiItem.msg,
                "msg": apiItem.msg,
                "city": apiItem.msg,
                // 类型12时拼接qq头像地址
                "url": apiItem.type === 12 ? "https://qlogo2.store.qq.com/qzone/" + apiItem.msg + "/" + apiItem.msg + "/100" : null,
                "prompt": apiItem.msg,
                // 结构一下默认自带参数
                ...apiItem.params,
            }
        }
        http(apiItem.url, apiItem.requestMethod, params, apiItem.requestType, apiItem.headers).then(res => {
            if (apiItem.type === 1) {
                room.say(res.data.data, talker)
            } else if (apiItem.type === 2) {
                room.say(res.data.data.output, talker)
            } else if (apiItem.type === 3) {
                const fileBox = FileBox.fromBuffer(res.data, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 4) {
                const fileBox = FileBox.fromUrl(res.data.text, {name:"1.png"})
                room.say(fileBox)
            } else if (apiItem.type === 5) {
                const fileBox = FileBox.fromUrl(res.data.data.image, {name:"1.png"})
                room.say(fileBox)
            } else if (apiItem.type === 6) {
                const fileBox = FileBox.fromUrl(res.data.data.data[0], {name:"1.png"})
                room.say(fileBox)
            } else if (apiItem.type === 7) {
                room.say(res.data, talker)
            } else if (apiItem.type === 8) {
                const fileBox = FileBox.fromBuffer(res.data, "1.gif")
                room.say(fileBox)
            } else if (apiItem.type === 9) {
                //点歌专用
                // 获取数据连接
                try {
                    if (res.data.data.text) {
                        room.say(res.data.data.text + "\n通过#号点歌可以选择播放次数\n如：歌曲名#3")
                        return;
                    }
                    let url = res.data.data.url
                    let params = {}
                    http(url, "get", params, 3, {}).then(res2 => {
                        if (res2.headers["content-type"].includes("application/json")) {
                            // 还原arraybuffer至msg
                            let data = new TextDecoder("utf-8").decode(res2.data)
                            if (data.code !== 200) {
                                room.say(data)
                            } else {
                                room.say(data.data)
                            }
                            return
                        }
                        const fileBox = FileBox.fromBuffer(res2.data, res.data.data.name + "-" + res.data.data.songname + ".mp3")
                        room.say(fileBox)
                    })
                } catch (e) {
                    room.say("没有找到相关歌曲:" + e.msg)
                }
            } else if (apiItem.type === 10) {
                room.say(res.data.data.Message, talker)
            } else if (apiItem.type === 11) {
                let params = {}
                http(res.data.text, "get", params, 3, {}).then(res2 => {
                    const fileBox = FileBox.fromBuffer(res2.data, "1.gif")
                    room.say(fileBox)
                })
            } else if (apiItem.type === 12) {
                const fileBox = FileBox.fromBuffer(res.data, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 13) {
                room.say(res.data.data.Msg, talker)
            } else if (apiItem.type === 14) {
                const fileBox = FileBox.fromStream(res.data, "1.png")
                room.say(fileBox)
            } else if (apiItem.type === 15) {
                let weatherStr = "";
                let data = res.data.data
                weatherStr += "\n城市：" + data.current.city + "\n"
                weatherStr += "天气：" + data.current.weather + "\n"
                weatherStr += "温度：" + data.current.temp + "\n"
                weatherStr += "风向：" + data.current.wind + "\n"
                weatherStr += "风向等级：" + data.current.windSpeed + "\n"
                weatherStr += "湿度：" + data.current.humidity + "\n"
                room.say(weatherStr, talker)
            } else if (apiItem.type === 16) {
                room.say(res.data.msg, talker)
            }
        }, e => {
            room.say("接口异常: " + e.msg)
        }).catch(e => {
            room.say("接口异常: " + e.msg)
        })
    }
}


const getAllApiName = () => {
    let nameList = []
    for (let i = 0; i < apiList.length; i++) {
        if (apiList[i].des) {
            nameList.push("#" + apiList[i].des)
        } else {
            nameList.push("#" + apiList[i].name)
        }
    }
    return nameList;
}
const getApi = (name, room) => {
    if (name.includes("#")) {
        for (let i = 0; i < apiList.length; i++) {
            let item = apiList[i]
            if (name.includes(item.name)) {
                item.msg = name.split(item.name)[1].trim()
                if (!item.msg.trim()) {
                    item.msg = "1172576293"
                }
                return item;
            }
        }
    }
    return null;
}
