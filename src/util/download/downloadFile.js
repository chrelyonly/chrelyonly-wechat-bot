import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";

import fs from "fs";
import path from "path";
import {archiveFolder} from "zip-lib";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// 尝试在下文件并返回压缩包
export const downloadFile = (talker, text, room, bot) => {

    try {
        // 获取数据   下载文件-地址-文件名-是否需要代理(如果有的话)  3-4个参数
        let strings = text.toString().split("-");
        let params = {

        }
        let proxy = strings.length > 3?{
            host: '192.168.1.7',
            port: 20811,
        }:undefined;
        http(strings[1], "get", params, 3, {},proxy).then(async res => {
            let data = res.data;
            //     返回buffer
            let fileBox = FileBox.fromBuffer(data, strings[2]);
            //压缩文件名
            let paths = new Date().Format("yyyyMMddHHmmss") + 'download.zip';
            // 创建临时文件夹
            const tempDir = path.join(__dirname, 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
            //     尝试压缩
            try {
                // 创建压缩包
                const zipPath = path.join(__dirname, paths);
                // 使用 zip-lib 创建带密码保护的压缩包, 将tempDir的文件放到zipPath中
                await archiveFolder(tempDir, zipPath, {
                    password: 'paths', // 设置压缩包密码
                    zlib: {level: 9} // 设置压缩级别
                });
                // 发送文件
                const fileBox = FileBox.fromFile(zipPath);
                await room.say(fileBox);

                // 删除临时目录和压缩文件
                fs.rmdirSync(tempDir, { recursive: true });
                fs.unlinkSync(zipPath);

            }catch (e) {
                fs.rmdirSync(tempDir, { recursive: true });
                if (fs.existsSync(path.join(__dirname, paths))) {
                    fs.unlinkSync(path.join(__dirname, paths));
                }
            }
        })
    }catch (e) {
        log.error(e)
        room.say("下载失败")
    }
}
