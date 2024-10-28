import {selectMessageKeywordList} from "./messageKeywordsUtil.js";
import {selectMessageKeywordsResponseList} from "./messageKeywordsResponseUtil.js";


/**
 * 自定义回复数据库操作查询
 */
export const myDivMessageResponseMain = (message, room, bot,talker)=>{
//     查询出全部的key数据
    selectMessageKeywordList(0,1000).then( res=>{
        // 循环列表
        for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]
            //     判断是否出现了关键字
            if(message.includes(item.keyword)) {
                // 查询自定义回复
                selectMessageKeywordsResponseList(item.id).then( res2=>{
                    if (res2.length === 0) {
                        // 如果数组为空，不执行任何操作
                        return;
                    }
                    // 生成一个0到数组长度-1之间的随机索引
                    let randomIndex = Math.floor(Math.random() * res2.length);
                    // 选择随机的消息
                    let selectedItem = res2[randomIndex];
                    // 发送选中的消息
                    room.say(selectedItem.content);
                    //
                    // // 计算总权重
                    // let totalWeight = res2.reduce((sum, item2) => sum + item2.level, 0);
                    //
                    // // 生成一个0到totalWeight之间的随机数
                    // let randomWeight = Math.random() * totalWeight;
                    //
                    //
                    // let cumulativeWeight = 0;
                    //
                    // // 遍历数组，寻找命中项
                    // for (let j = 0; j < res2.length; j++) {
                    //     let item2 = res2[j];
                    //     cumulativeWeight += item2.level;
                    //
                    //     // 判断是否命中
                    //     if (randomWeight < cumulativeWeight) {
                    //         room.say(item2.content);
                    //         break;
                    //     }
                    //
                    //     // 如果是最后一个都没有命中,那么发送最后一个
                    //     if (j === res2.length - 1) {
                    //         room.say(item2.content);
                    //     }
                    // }
                })
                break;
            }
        }
    })
}
