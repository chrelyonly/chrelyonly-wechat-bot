// 导入微信包
import {log, WechatyBuilder} from 'wechaty'
import {onError, onLogin, onMessage, onScan, roomTopic} from "./wechat/api.js";
// import {roomEventInit} from "./util/roomUtil.js";
import {isTimeTo} from "./util/pointUtil.js";

// 初始化机器人
const bot = WechatyBuilder.build({
    name: "cm",
    puppet: 'wechaty-puppet-wechat4u',
    puppetOptions: {
        uos: true,
    },
})
// 初始化房间事件
// roomEventInit(bot)
// 扫码
bot.on('scan', onScan)
// 登录
bot.on('login', (user) => {
    onLogin(user, bot)
})
// 修改群名称
bot.on('room-topic', roomTopic)
// 异常
bot.on('error', onError)
// 收到消息
bot.on('message', message => {
    onMessage(message, bot)
})
bot
    .start()
    .then(() => {
        log.info('启动成功')
    }, err => {
        log.info('启动失败')
        log.info(err)
    })
    .catch((e) => {
        log.info("启动失败")
        console.error(e)
    })
// 一秒执行一次判断是否到整点,定时事件
setInterval( ()=> {
    isTimeTo(bot);
}, 1000);
// 每10分钟执行一次
setInterval( () =>{
    checkDnfHot(bot);
}, 60 * 1000 * 10);
// 每30分钟执行一次
setInterval( () =>{
    checkDnfFree(bot);
}, 60 * 1000 * 360);


// web服务器
import express from 'express'
import {testInit} from "./util/test/testUtil.js";
import {checkDnfFree, checkDnfHot} from "./util/dnf/dnf.js";
import {webApi} from "./web/api.js";

const app = express();
// 解析JSON数据的中间件
app.use(express.json());
// 访问本地静态文件， __dirname 代表本脚本的路径
app.use('/', express.static("./static/"));
// 提交画画文件
// app.post('/okDraw', (req, res) => {
//     okDraw(req,bot)
//     res.send('ok')
// });
//
// app.post('/resUserinfo', (req, res) => {
//     resUserinfo(req,bot)
//     res.send('ok')
// });
app.get('/testInit', (req, res) => {
    testInit(bot, req.query).then(r => {
        res.send(r)
    }, e => {
        res.send(e)
    })
});
app.listen(55555, () => {
    log.info('web监听55555端口')
})
webApi(app)

