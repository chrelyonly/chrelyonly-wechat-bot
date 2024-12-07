import {http} from "../https.js";
import {FileBox} from "file-box";
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

http("http://music.163.com/song/media/outer/url?id=1895330088","get",{},3,{}).then(async res => {
    const fileBox = FileBox.fromBuffer(res.data,"1.mp3");
    await fileBox.toFile("D:\\dev\\dev\\project\\chrelyonly-wechat-bot\\src\\util\\test\\qqqq.mp3");
})
