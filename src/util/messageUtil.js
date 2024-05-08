import {FileBox} from "file-box";
import {http} from "./https.js";

// 自定义更据消息回复事件
export function myOnMessage(message,room, bot) {
    // 根据消息内容回复
    let text = message.text();
    // 获取发送者
    let talker = message.talker()
    if (text.toString().includes("菜单")) {
        let menu = "菜单：\n";
        for (let i = 0; i < getAllApiName().length; i++) {
            menu += (i + 1) + "." + getAllApiName()[i] + "\n";
        }
        room.say(menu)
        return;
    }
    let apiItem = getApi(text);
    if (apiItem){
        let params = {
            "QQ": apiItem.msg,
            "name": apiItem.msg,
            "msg": apiItem.msg,
        }
        http(apiItem.url,"get",params,apiItem.requestType,{}).then( res => {
            if (apiItem.type === 1) {
                room.say(res.data.data)
            } else if (apiItem.type === 2) {
                room.say(res.data.data.output)
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
                room.say(res.data)
            } else if (apiItem.type === 8) {
                const fileBox = FileBox.fromBuffer(res.data, "1.gif")
                room.say(fileBox)
            }
        })
    }
}

const apiList = [
    {
        name: "表情包",
        url: "https://api.lolimi.cn/API/bqb/api.php?type=动漫表情",
        type: 3,
        requestType: 3
    },
    {
        name: "柴郡",
        url: "https://api.lolimi.cn/API/chaiq/c.php",
        type: 3,
        requestType: 3
    },
    {
        name: "求婚",
        url: "https://api.lolimi.cn/API/face_propose/",
        type: 3,
        requestType: 3
    },
    {
        name: "感动哭了",
        url: "https://api.lolimi.cn/API/face_touch/",
        type: 3,
        requestType: 3
    },
    {
        name: "高质量",
        url: "https://api.lolimi.cn/API/face_gao/",
        type: 3,
        requestType: 3
    },
    {
        name: "咸鱼",
        url: "https://api.lolimi.cn/API/face_yu/",
        type: 3,
        requestType: 3
    },
    {
        name: "摸摸",
        url: "https://api.lolimi.cn/API/face_petpet/",
        type: 8,
        requestType: 3
    },
    {
        name: "膜拜",
        url: "https://api.lolimi.cn/API/face_worship/",
        type: 8,
        requestType: 3
    },
    {
        name: "想看",
        url: "https://api.lolimi.cn/API/face_thsee/",
        type: 3,
        requestType: 3
    },
    {
        name: "咬",
        url: "https://api.lolimi.cn/API/face_suck/",
        type: 8,
        requestType: 3
    },
    {
        name: "捣",
        url: "https://api.lolimi.cn/API/face_pound/",
        type: 8,
        requestType: 3
    },
    {
        name: "玩",
        url: "https://api.lolimi.cn/API/face_play/",
        type: 8,
        requestType: 3
    },
    {
        name: "你可能需要它",
        url: "https://api.lolimi.cn/API/face_need/",
        type: 3,
        requestType: 3
    },
    {
        name: "吃掉",
        url: "https://api.lolimi.cn/API/face_bite/",
        type: 8,
        requestType: 3
    },
    {
        name: "拍",
        url: "https://api.lolimi.cn/API/face_pat/",
        type: 8,
        requestType: 3
    },
    {
        name: "兽语加密",
        url: "https://api.lolimi.cn/API/sho_u/",
        type: 3,
        requestType: 3
    },
    {
        name: "龙图",
        url: "https://api.lolimi.cn/API/longt/l.php",
        type: 3,
        requestType: 3
    },
    {
        name: "摸鱼人日历",
        url: "https://api.lolimi.cn/API/moyu/",
        type: 3,
        requestType: 3
    },
    {
        name: "撕了你",
        url: "https://api.lolimi.cn/API/si/",
        type: 3,
        requestType: 3
    },
    {
        name: "哦哈哟",
        url: "https://api.lolimi.cn/API/image-zw/",
        type: 3,
        requestType: 3
    },
    {
        name: "晚上好",
        url: "https://api.lolimi.cn/API/image-zw/",
        type: 3,
        requestType: 3
    },
    {
        name: "可莉吃",
        url: "https://api.lolimi.cn/API/chi/",
        type: 8,
        requestType: 3
    },
    {
        name: "腿",
        url: "https://api.lolimi.cn/API/meizi/api.php",
        type: 4,
        requestType: 1
    },
    {
        name: "抽签",
        url: "https://api.lolimi.cn/API/chouq/api.php",
        type: 5,
        requestType: 1
    },
    {
        name: "随机cosplay",
        url: "https://api.lolimi.cn/API/cosplay/api.php",
        type: 6,
        requestType: 1
    },
    {
        name: "爬",
        url: "https://api.lolimi.cn/API/pa/api.php",
        type: 3,
        requestType: 3
    },
    {
        name: "丢",
        url: "https://api.lolimi.cn/API/diu/api.php",
        type: 3,
        requestType: 3
    },
    {
        name: "点赞",
        url: "https://api.lolimi.cn/API/zan/api.php",
        type: 3,
        requestType: 3
    },
    // 文字内容
    {
        name: "发病",
        url: "https://api.lolimi.cn/API/fabing/fb.php",
        type: 1,
        requestType: 1
    },
    {
        // 狗屁不通文章生成
        name: "你说得对",
        url: "https://api.lolimi.cn/API/dog/api.php?num=500&type=text",
        type: 7,
        requestType: 1
    },
    {
        name: "动漫一言",
        url: "https://api.lolimi.cn/API/dmyiyan/api.php",
        type: 7,
        requestType: 1
    },
    {
        name: "绕口令",
        url: "https://api.lolimi.cn/API/rao/api.php",
        type: 1,
        requestType: 1
    },
    {
        name: "舔狗日记",
        url: "https://api.lolimi.cn/API/tgrj/api.php",
        type: 7,
        requestType: 1
    },
    // ai问答
    {
        name: "提问",
        url: "https://api.lolimi.cn/API/AI/mm.php",
        type: 2,
        requestType: 1
    }
]

const getAllApiName = () => {
    let nameList = []
    for (let i = 0; i < apiList.length; i++) {
        nameList.push(apiList[i].name)
    }
    return nameList;
}
const getApi = (name) => {
    for (let i = 0; i < apiList.length; i++) {
        let item = apiList[i]
        if (name.includes(item.name)){
            item.msg = name.split(item.name)[1]
            if (!item.msg.trim()){
                item.msg = "1172576293"
            }
            return item;
        }
    }
    return null;
}
