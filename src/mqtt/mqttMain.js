export const SOCKET_SERVICE = ' wss://temp-img.chrelyonly.cn/mqtt'
export const USERNAME = "chrelyonly";
export const PASSWORD = "chrelyonly";
// 引入全局websocket
import mqtt from "mqtt";
// 服务端mqtt消息
let mqttServer = null;
// 机器人
let bot = null;
try {
    // 这里自行取一个名字id
    let userId = new Date().Format("yyyyMMddhhmmssSSS");
    // 用户订阅id
    const singleTopic = "/userId" + userId;
    // 在线人数订阅
    const onlineUserNum = "/onlineUserNum";
    // 能量订阅
    const wechatRun = "/wechatRun"

    //监听连接状态
    mqttServer.on("connect", () => {
        console.log("连接成功");
        mqttServer.subscribe(singleTopic, err => {
            if (!err) {
                console.log("订阅成功:" + singleTopic);
            }
        });
        mqttServer.subscribe(onlineUserNum, err => {
            if (!err) {
                console.log("订阅成功:" + onlineUserNum);
            }
        });
        mqttServer.subscribe(wechatRun, err => {
            if (!err) {
                console.log("订阅成功:" + wechatRun);
            }
        });
    });
    mqttServer.on("message", (topic, message) => {
        mqttMessage(topic, message, singleTopic, bot)
    });
} catch (e) {
    console.log(e);
    console.log("mqtt连接失败");
}

/**
 * 初始化mqtt
 * @param bot
 */
export const mqttMain = (bot) => {
    mqttServer = mqtt.connect(SOCKET_SERVICE, {
        username: USERNAME,
        password: PASSWORD
    });
}
