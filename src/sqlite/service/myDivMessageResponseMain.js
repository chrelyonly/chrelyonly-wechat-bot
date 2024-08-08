import {selectMessageKeywordList} from "./messageKeywordsUtil.js";
import {selectMessageKeywordsResponseList} from "./messageKeywordsResponseUtil.js";


/**
 * 自定义回复数据库操作查询
 */
export const myDivMessageResponseMain = (message, room, bot,talker)=>{
//     查询出全部的key数据
    selectMessageKeywordList(0,1000).then( res=>{
        // 循环列表
        for (let i = 0; i < res.length; i++) {
            let item = res[i]
            //     判断是否出现了关键字
            if(item.keyword.includes(message)) {
                // 查询自定义回复
                selectMessageKeywordsResponseList().then( res2=>{
                    for (let j = 0; j < res2.length; j++) {
                        // 对象
                        let item2 = res2[j]
                        // 权重
                        let level = item2.level
                        // 回复内容
                        let content = item2.content
                        // 将权重标准化为0到1之间的值
                        let probabilityThreshold = level / 10;
                        let probability = Math.random()
                        // 判断是否命中
                        if (probability < probabilityThreshold) {
                            // 执行自定义回复
                            room.say(content)
                            break;
                        }
                        //     如果是最后一个都没有命中,那么发送最后一个
                        if(j === res2.length-1) {
                            // 执行自定义回复
                            room.say(content)
                        }
                    }
                })
                break;
            }
        }
    })
}