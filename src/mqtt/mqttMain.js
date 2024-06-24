import {mqttMessage} from "./mqttUtil.js";

export const SOCKET_SERVICE = ' wss://chrelyonly.cn//mqtt-api'
export const USERNAME = "chrelyonly";
export const PASSWORD = "chrelyonly";
// 引入全局websocket
import mqtt from "mqtt";
// 服务端mqtt消息
let mqttServer = null;
/**
 * 初始化mqtt
 * @param bot
 */
export const mqttMain = (bot) => {
        if (!bot || !bot.id) {
            throw new Error("无效的bot对象，bot.id不存在");
        }
        // 使用机器人id作为订阅id
        const userId = bot.id;
        // const userId = new Date().Format("chrelyonly");
// 用户订阅id
        const singleTopic = "/userId" + userId;
// 在线人数订阅
        const onlineUserNum = "/onlineUserNum" + userId;
// 能量订阅
        const wechatRun = "/wechatRun" + userId
    mqttServer = mqtt.connect(SOCKET_SERVICE, {
        username: USERNAME,
        password: PASSWORD,
        reconnectPeriod: 1000, // 自动重连间隔时间
    });
        //监听连接状态
        mqttServer.on("connect", () => {
            // console.log("连接成功");
            mqttServer.subscribe(singleTopic, err => {
                if (!err) {
                    // console.log("订阅成功用户:" + singleTopic);
                }
            });
            mqttServer.subscribe(onlineUserNum, err => {
                if (!err) {
                    // console.log("订阅成功总人数:" + onlineUserNum);
                }
            });
            mqttServer.subscribe(wechatRun, err => {
                if (!err) {
                    // console.log("订阅成功wechatRun:" + wechatRun);
                }
            });
        });
        mqttServer.on("message", (topic, message) => {
            mqttMessage(topic, message, singleTopic, bot)
        });
    // mqttServer.on("error", (err) => {
    //     console.error("MQTT连接错误:", err);
    // });
    //
    // mqttServer.on("reconnect", () => {
    //     console.log("MQTT正在重连...");
    // });
    //
    // mqttServer.on("offline", () => {
    //     console.log("MQTT离线");
    // });
}
