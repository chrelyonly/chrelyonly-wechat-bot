import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { http } from "../https.js";
import { FileBox } from "file-box";
import { log } from "wechaty";
import fs from "fs";
import path from "path";
import { archiveFolder } from "zip-lib";
import { HttpsProxyAgent } from "https-proxy-agent";
import "../newdate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const timestamp = () =>{
    return new Date().Format("YYYYMMDDHHmmss");
}

export const downloadFile = async (talker, text, room, bot) => {
    log.info("尝试下载文件.....");
    let tempDir;
    let zipPath;
    try {
        const strings = text.toString().split("--");
        const url = new URL(strings[1]);
        const headers = { "referer": url.origin };

        const proxyUrl = strings.length > 3 ? 'http://192.168.1.7:20811' : undefined;
        const proxy = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

        const res = await http(strings[1], "get", {}, 3, headers, proxy);
        log.info("下载图片...");

        tempDir = path.join(__dirname, `${timestamp()}temp`);
        await fs.promises.mkdir(tempDir, { recursive: true });

        zipPath = path.join(__dirname, `${timestamp()}download.zip`);
        const fileBox = FileBox.fromBuffer(res.data, strings[2]);

        log.info("保存文件...");
        await fileBox.toFile(path.join(tempDir, `${timestamp()}.${strings[2]}`));

        log.info("压缩文件...");
        await archiveFolder(tempDir, zipPath);

        const fileBoxZip = FileBox.fromFile(zipPath);
        log.info("发送文件...");
        await room.say(fileBoxZip);

    } catch (e) {
        log.error('处理过程中发生错误:', e);
        room.say("下载失败,请检查链接格式是否正确");
    } finally {
        // 清理临时文件
        const cleanup = async () => {
            try {
                await fs.promises.rm(tempDir, { recursive: true });
                await fs.promises.unlink(zipPath);
            } catch (cleanupError) {
                log.error('清理文件时出错:', cleanupError);
            }
        };
        await cleanup();
    }
};
