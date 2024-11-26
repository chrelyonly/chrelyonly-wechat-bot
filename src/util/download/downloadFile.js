import { http } from "../https.js";
import { FileBox } from "file-box";
import { log } from "wechaty";
import fs from "fs";
import path from "path";
import { archiveFolder } from "zip-lib";
import { HttpsProxyAgent } from "https-proxy-agent";
import "../newdate.js";


const timestamp = () => new Date().Format("YYYYMMDDHHmmss");

// 修改目标目录
const STATIC_DIR = "/chrelyonly-wechat-bot/static/temp/download/";

export const downloadFile = async (talker, text, room) => {
    log.info("尝试下载文件.....");
    try {
        const strings = text.toString().split("--");
        const url = new URL(strings[1]);
        const headers = { referer: url.origin };

        // 如果有代理地址，设置代理
        const proxyUrl = strings.length > 3 ? "http://192.168.1.7:20811" : undefined;
        const proxy = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

        // 下载文件
        const res = await http(strings[1], "get", {}, 3, headers, proxy);
        log.info("下载图片完成...");

        // 保存临时文件
        const paths = `${timestamp()}temp`;
        const tempDir = path.join(STATIC_DIR, paths);
        await fs.promises.mkdir(tempDir, { recursive: true });
        const paths1 = `${timestamp()}.${strings[2]}`;
        const filePath = path.join(tempDir, paths1);
        const fileBox = FileBox.fromBuffer(res.data, strings[2]);
        await fileBox.toFile(filePath);
        log.info("文件已保存:", filePath);

        // 压缩文件
        // const zipPath = path.join(STATIC_DIR, `${timestamp()}download.zip`);
        // await archiveFolder(tempDir, zipPath);
        // log.info("文件已压缩:", zipPath);

        // 发送文件
        // const fileBoxZip = FileBox.fromFile(zipPath);
        // await room.say(fileBoxZip);
        log.info("文件已转存: 点击下载 https://bot-api.dj.non-human-research-center.top/temp/download/" + paths + "/" + paths1);
        room.say("文件已转存: 点击下载 https://bot-api.dj.non-human-research-center.top/temp/download/" + paths + "/" + paths1);

    } catch (e) {
        log.error("处理过程中发生错误:", e);
        room.say(
            "下载失败，请检查链接格式是否正确：\n" +
            "1. 下载文件--下载地址--文件后缀 (例如：png)\n" +
            "2. 第4个参数可选，用于启用代理下载"
        );
    }
};
