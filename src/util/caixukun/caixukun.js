
import "../newdate.js";
import {http} from "../https.js";
import {FileBox} from "file-box";


export const caixukun = (room) => {

    let params = {

    }
    http("https://api.yujn.cn/api/sjkk.php","get",params,3,{}).then((res) => {
        const fileBox = FileBox.fromBuffer(res.data, new Date().Format("yyyyMMddHHmmss") + "caixukun.mp3")
        room.say(fileBox)
    })
}
