import {FileBox} from "file-box";
import {http} from "../https.js";

/**
 * lol英雄查询
 */
export const lolHero = (bot,room,text)=>{
    let params = {
        hero: text,
        type: "image"
    }
    http("https://api.pearktrue.cn/api/lolhero/","get",params,3,{}).then( res=> {
        const fileBox = FileBox.fromBuffer(res.data, "hero.png")
        room.say(fileBox)
    })
}