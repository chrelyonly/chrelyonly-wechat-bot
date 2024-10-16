import {http} from "../https.js";
import {HttpsProxyAgent} from "https-proxy-agent";
// 怎么读
export const chineseTxtRead = () => {
    let params = {

    }
    let domain = "https://i.pximg.net/img-master/img/2024/10/15/18/31/17/123357993_p0_master1200.jpg";
    // 正则表达式提取域名
    let regex = /^(https?:\/\/[^\/]+)/;
    let match = domain.match(regex);
    let extractedDomain = match ? match[0] : null;
    let headers = {
        "referer": extractedDomain
    }
    // let proxy = {
    //     host: '127.0.0.1',
    //     port: 20811,
    //     protocol: "http"
    // }
    // 测试发现 要想https走 http必须要处理协议 使用这个包可以解决
    const proxy = new HttpsProxyAgent(`http://127.0.0.1:20811`);
    http(domain, "get", params, 3, headers, proxy).then(res => {
        console.log(res.data);
    })
}


chineseTxtRead()
