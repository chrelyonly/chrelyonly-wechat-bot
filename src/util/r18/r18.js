import { http } from "../https.js";
import { FileBox } from "file-box";
import fs from "fs";
import path from "path";
import { archiveFolder } from "zip-lib";

import archiver from "archiver";
import { PassThrough } from "stream";
import { promisify } from "util";
import { pipeline } from "stream";
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import  "../newdate.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const pipelineAsync = promisify(pipeline);

const downloadImage = async (url) => {
    const response = await http(url, "get", {}, 3, { responseType: 'arraybuffer' });
    return response.data;
};

export const r18 = async (room, bot) => {
    let msg = "禁止色色,达咩哟!";
    await room.say(msg);
    const imageUrls = [
        "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
        "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact"
    ];

    try {
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        // PassThrough stream to collect the zip data in memory
        const zipStream = new PassThrough();
        archive.pipe(zipStream);

        for (let i = 0; i < imageUrls.length; i++) {
            const imageData = await downloadImage(imageUrls[i]);
            archive.append(imageData, { name: `image${i + 1}.jpg` });
        }

        archive.finalize();

        // Convert zipStream to a buffer
        const buffers = [];
        for await (const chunk of zipStream) {
            buffers.push(chunk);
        }
        const zipBuffer = Buffer.concat(buffers);

        const fileBox = FileBox.fromBuffer(zipBuffer, 'images.zip');
        await room.say(fileBox);
    } catch (error) {
        console.error("Error downloading images or creating zip file:", error);
    }
};
