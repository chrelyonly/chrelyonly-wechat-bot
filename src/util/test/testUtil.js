import {log} from "wechaty";

/**
 * 测试工具
 */
export const testInit = (bot,query)=>{
    log.info('测试工具')
    return new Promise((success,error) => {
        bot.Room.find({topic: '🍓酱の后🌸园  SVIP内部群1'}).then( room => {
            if (room){
                room.say(query.msg).then( res=> {
                    success("发送成功")
                })
            }
        })
    })
}
