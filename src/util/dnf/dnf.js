


import {http} from "../https.js";
// 上次检查时间点
let lastUpdateTime = ""
// 每一段时间检查dnf的热点
export const checkDnfHot = (bot)=>{
    let params = {
        id: "colg_forum_head",
        act: "getForumHeadInfo",
        fid: 171
    }
    let headers = {
    }
    http("https://bbs.colg.cn/plugin.php", "get", params, 1, headers).then(res => {
        let data = res.data.data
        // 热点数据
        let recommendHot = data.recommend["1"].list
        if(lastUpdateTime === recommendHot["0"].dateline){
            return;
        }
        // 上次更新时间
        lastUpdateTime = recommendHot[0].dateline
    //     获取当前版本
        let msg = "dnf小助手实时监听变化: \n"
        msg += "dnf当前版本: \n"
        msg += "  版本名称(国服): "
            + data.time_axis.time_line_detail.time_axis_cn[0].list[0].dateline
            + data.time_axis.time_line_detail.time_axis_cn[0].list[0].title
            + ", " + data.time_axis.time_line_detail.time_axis_cn[0].list[0].desc
            + "\n"
        msg += "  版本名称(韩服): "
            + data.time_axis.time_line_detail.time_axis_kr[0].list[0].dateline
            + data.time_axis.time_line_detail.time_axis_kr[0].list[0].title
            + ", " + data.time_axis.time_line_detail.time_axis_kr[0].list[0].desc
            + "\n"
        msg += "  更多请查看: " + data.time_axis.time_more_url + "\n"
        msg += "热门推荐: \n"
        recommendHot.forEach(item => {
            msg += "  标题: " + item.title + "\n"
            msg += "  详情: " + item.url + "\n"
        })
        let recommendNew = data.recommend[1].list
        msg += "最新爆料: \n"
        recommendNew.forEach(item => {
            msg += "  标题: " + item.title + "\n"
            msg += "  详情: " + item.url + "\n"
        })
        msg += "我要玩dnf,dnf真好玩\n"
        sendMsg(bot,msg)
    })
}


// 上次游戏比例
let lastFreeK6 = "";
/**
 * 检查游戏比例
 * @param bot
 * @param room
 * @param text
 */
export const checkDnfFree = (bot,room,text = null) =>{
    let params = {
        gameId: "G10",
        groupId: "G5709P001",
    }
    let headers = {
    }
    http("https://gw.7881.com/goods-service-api/api/goods/gameCoinRate", "post", params, 1, headers).then(res => {
        let data = res.data.body

        if(text){
//     获取当前版本
            let msg = "dnf小助手: 实时监听游戏比例变化: \n"
            data.forEach(item => {
                msg += "  跨区: " + item.title + "\n"
                msg += "    当前比例: " + item.unitPerPrice + ", 单价: " + item.pricePerUnit + "\n"
                msg += "    最新比例: " + item.dealUnitPerPrice + ", 单价: " + item.dealPricePerUnit + "\n"
            })
            msg += "我要玩dnf,dnf真好玩\n"
            // sendMsg(bot,msg)
            room.say(msg)
            return;
        }else{

        }
        if(lastFreeK6 === data[7].unitPerPrice){
            return;
        }
        lastFreeK6 = data[7].unitPerPrice
        //     获取当前版本
        let msg = "dnf小助手: 实时监听游戏比例变化: \n"
        data.forEach(item => {
              if (item.title === "跨六"){
                  msg += "  跨区: " + item.title + "\n"
                  msg += "    当前比例: " + item.unitPerPrice + ", 单价: " + item.pricePerUnit + "\n"
                  msg += "    最新比例: " + item.dealUnitPerPrice + ", 单价: " + item.dealPricePerUnit + "\n"
              }
        })
        msg += "我要玩dnf,dnf真好玩\n"
        sendMsg(bot,msg)
    })
}

const sendMsg = (bot,msg) => {
    // 寻找指定群
    bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then(room => {
        if (room) {
            room.say(msg)
        }
        room.say(msg)
    })
}
