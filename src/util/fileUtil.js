import {getCacheAll, setCache} from "./cacheUtil.js";
import fs from "fs";
// const fs = require('fs');
import  "./newdate.js";

/**
 * 保存数据到json文件,做持久化
 * @returns {null}
 */
export const saveFileToJson = (id)=>{
    try {
        //     写入文件持久化
        //     取出所有waterGroups开头的次数
        let cacheAll = getCacheAll("waterGroups"  +  id);
    //     如果没有数据
        if (!cacheAll){
            return null;
        }else{
//     对数据进行排序
            let sortData = cacheAll.sort((a,b)=>{
                return b.number - a.number;
            });
            let str = JSON.stringify(sortData);
            // 打开文件,如果没有的话则创建,有的话则写入新数据
            fs.open('./src/log/waterGroups' + id + (new Date().Format("yyyyMMdd"))+ '.json','w',function (err,fd) {
                if (err){
                    console.log("打开文件失败")
                    console.log(err)
                }else{
                    // console.log("打开文件成功")
                    fs.write(fd,str,function (err) {
                        if (err){
                            console.log("写入文件失败")
                            console.log(err)
                        }else{
                            // console.log("写入文件成功")
                        }
                    })
                }
            })

        }
    }catch (e){
        console.log("写入文件异常")
        console.log(e)
    }
}
