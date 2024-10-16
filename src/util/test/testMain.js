import {http} from "../https.js";
import {HttpsProxyAgent} from "https-proxy-agent";
// 怎么读
export const chineseTxtRead = () => {
    // 获取数据   下载文件-地址-文件名-是否需要代理(如果有的话)  3-4个参数
    let strings = "下载文件--https://i.pximg.net/img-master/img/2024/10/15/18/31/17/123357993_p0_master1200.jpg--png--true".toString().split("--");
    let params = {

    }
    // 正则表达式提取域名
    let regex = /^(https?:\/\/[^\/]+)/;
    let match = strings[1].match(regex);
    let extractedDomain = match ? match[0] : null;
    let headers = {
        "referer": extractedDomain
    }
    let proxy = strings.length > 3? new HttpsProxyAgent(`http://127.0.0.1:20811`):undefined;
    http(strings[1], "get", params, 3, headers, proxy).then( async res => {
        console.log(res);
    })
}


chineseTxtRead()
