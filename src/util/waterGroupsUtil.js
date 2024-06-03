
// 引入缓存工具
import {delCache, getCache, getCacheAll, setCache} from "./cacheUtil.js";
import { saveFileToJson} from "./fileUtil.js";
import fs from "fs";
/**
 * 获取水群王
 */
export const getWaterGroupsWin = (room,bot)=> {
//     取出所有waterGroups开头的次数
    let cacheAll = getCacheAll("waterGroups"  +  room.id);
//     如果没有数据
    if (!cacheAll){
        return null;
    }
//     对数据进行排序
    let sortData = cacheAll.sort((a,b)=>{
        return b.number - a.number;
    });
    let str= "";
    str = "今日" + new Date().Format("yyyy年MM月dd日") + "\n"
    str += "水群排行榜:" + sortData[0].title + "\n"
    for (let i = 0; i < sortData.length; i++) {
        str += "第" + (i + 1) + "名:" + sortData[i].name + "-次数:" + sortData[i].number + "\n"
    }
    str +="水群王是:" + sortData[0].name + "-次数:" + sortData[0].number
    room.say(str);
}
/**
 * 保存水群次数
 * room 房间体
 * talker 用户体
 */
export const saveWaterGroups = (groupName,room,talker,number)=> {
    // 从文件中读取并设置缓存
    let todayLog = './src/log/waterGroups' + room.id + (new Date().Format("yyyyMMdd"))+ '.json';
    //如果文件存在
    if(fs.existsSync(todayLog)){
// 读取缓存配置
        fs.readFile(todayLog,function (err,data) {
            if (err){
                console.log("读取失败")
                console.log(err)
            }else{
                // console.log("读取成功")
                let list = JSON.parse(data.toString()) || [];
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    //     保存到缓存
                    setCache("waterGroups" + room.id + item.id,item);
                }
                // 判断写入缓存
                let oldData = getCache("waterGroups"  +  room.id + talker.id);
                if (oldData && oldData.number){
                    oldData.number = oldData.number + +number;
                }else{
                    oldData = {
                        // 保存群名称,方便区分
                        title: groupName,
                        // 保存群成员,方便区分
                        name: talker.name(),
                        // 群次数
                        number: 1,
                        // 发言人id
                        id: talker.id,
                        //    暂时不记录时间
                    }
                }
                setCache("waterGroups"  +  room.id + talker.id,JSON.stringify(oldData),60 * 60 * 24 * 30);
                saveFileToJson(room.id);
            }
        })
    }else{
    //     否则创建文件
        fs.writeFile(todayLog,"[]",function (err) {
            if (err){
                console.log("创建失败")
                console.log(err)
            }else{
                console.log("创建成功")
                //     清除缓存
                getCacheAll("waterGroups"  +  room.id).forEach((item)=>{
                    delCache("waterGroups"  +  room.id + item.id);
                })
            }
        })
    }
}
