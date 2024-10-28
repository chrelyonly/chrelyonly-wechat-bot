// 引入缓存工具
// import {delCache, getCache, getCacheAll, setCache} from "./cacheUtil.js";
// 改用sqlite
import {saveWaterKing, selectAllWaterKing, selectWaterKing} from "../sqlite/waterKing/wechatKingSqlDbUtil.js";

/**
 * 获取水群王
 */
export const getWaterGroupsWin = (room, bot, number) => {
//     取出所有waterGroups开头的次数
//     let cacheAll = getCacheAll("waterGroups"  +  room.id);
    selectAllWaterKing(room.id).then((cacheAll) => {
        //     如果没有数据
        if (!cacheAll) {
            return null;
        }
//     对数据进行排序
        let sortData = cacheAll.sort((a, b) => {
            return b.number - a.number;
        });
        if (sortData.length === 0) {
            return null;
        }
        let str = "";
        str = "今日" + new Date().Format("yyyy年MM月dd日") + "\n"
        str += "群名称:" + sortData[0].groupName + "\n"
        // number = sortData.length < number ? sortData.length : number;
        for (let i = 0; i < sortData.length; i++) {
            str += "第" + (i + 1) + "名:" + sortData[i].name + "-次数:" + sortData[i].number + "\n"
        }
        str += "水群王是:" + sortData[0].name + "-次数:" + sortData[0].number
        room.say(str);
    });
}
/**
 * 保存水群次数
 * room 房间体
 * talker 用户体
 */
export const saveWaterGroups = (groupName, room, talker, number) => {
    // 判断写入缓存
    selectWaterKing(talker.id, room.id).then((oldData) => {
        if (oldData && oldData.number) {
            oldData.number = oldData.number + +number;
        } else {
            oldData = {
                number: 1,
            }
        }
        saveWaterKing(groupName, talker.id, talker.name(), room.id, oldData.number)
    });
}
