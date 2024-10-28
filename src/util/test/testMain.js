import {http} from "../https.js";
import {HttpsProxyAgent} from "https-proxy-agent";
// 怎么读
// export const chineseTxtRead = (room,bot,message) => {
//     let params = {
//         wd: message,
//         ptype: "zici"
//     }
//     http("https://hanyu.baidu.com/s","get",params,1,{}).then( res => {
//         const match = res.data.match(readRegex);
//         if (match) {
//             let tempText = match[match.length-1].replace(/<[^>]*>/g, '').trim(); // 去掉任何HTML标签
//             tempText = tempText.replaceAll(" ","").trim();
//             console.log(tempText)
//         }
//     })
// }
//
// chineseTxtRead()
