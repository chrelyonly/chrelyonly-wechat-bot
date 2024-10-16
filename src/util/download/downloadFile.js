import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";

import fs from "fs";
import path from "path";
import {archiveFolder} from "zip-lib";
import {HttpsProxyAgent} from "https-proxy-agent";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// 尝试在下文件并返回压缩包
export const downloadFile = (talker, text, room, bot) => {

    try {
        // 获取数据   下载文件-地址-文件名-是否需要代理(如果有的话)  3-4个参数
        let strings = text.toString().split("--");
        let params = {

        }
        // 正则表达式提取域名
        let regex = /^(https?:\/\/[^\/]+)/;
        let match = strings[1].match(regex);
        let extractedDomain = match ? match[0] : null;
        let headers = {
            "referer": extractedDomain
        }
        let proxy = strings.length > 3? new HttpsProxyAgent(`http://192.168.1.7:20811`):undefined;
        http(strings[1], "get", params, 3, headers, proxy).then(async res => {
            let data = res.data;
            // 压缩文件名
            let paths = new Date().Format("yyyyMMddHHmmss") + 'download.zip';
            // 创建临时文件夹
            const tempDir = path.join(__dirname, 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
            // 创建压缩包
            const zipPath = path.join(__dirname, paths);
            // 尝试压缩
            try {
                // 返回buffer
                let fileBox = FileBox.fromBuffer(data, strings[2]);
                // 保存文件到磁盘
                await fileBox.toFile(path.join(tempDir, new Date().Format("yyyyMMddHHmmss") + "." + strings[2]));

                // 使用 zip-lib 创建带密码保护的压缩包
                await archiveFolder(tempDir, zipPath, {});

                // 发送文件
                const fileBoxZip = FileBox.fromFile(zipPath);
                await room.say(fileBoxZip); // 发送压缩文件

            } catch (e) {
                console.error('处理过程中发生错误:', e);
            } finally {
                // 删除临时目录和压缩文件
                if (fs.existsSync(tempDir)) {
                    fs.rmSync(tempDir, { recursive: true });
                }
                if (fs.existsSync(zipPath)) {
                    fs.unlinkSync(zipPath);
                }
            }
        });
    }catch (e) {
        log.error(e)
        room.say("下载失败")
    }
}
