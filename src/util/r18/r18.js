import {dirname} from "node:path"
import {fileURLToPath} from "node:url"
import "../newdate.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const downloadImage = async (url, filepath) => {
//     const response = await http(url, "get", {}, 4, {});
//     const writer = fs.createWriteStream(filepath);
//     response.data.pipe(writer);
//     return new Promise((resolve, reject) => {
//         writer.on('finish', () => {
//             writer.close(resolve);
//         });
//         writer.on('error', (err) => {
//             writer.close(() => reject(err));
//         });
//     });
// };

export const r18 = async (room, bot) => {
    let msg = "禁止色色,达咩哟!";
    await room.say(msg);

    // const imageUrls = [
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=honkai",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact",
    //     "https://image.anosu.top/pixiv/direct?r18=1&keyword=genshinimpact"
    // ];
    //
    // const tempDir = path.join(__dirname, 'temp');
    // if (!fs.existsSync(tempDir)) {
    //     fs.mkdirSync(tempDir);
    // }
    //
    // const downloadPromises = imageUrls.map((url, index) => {
    //     const filepath = path.join(tempDir, `image${index + 1}.jpg`);
    //     return downloadImage(url, filepath);
    // });
    //
    // try {
    //     await Promise.all(downloadPromises);
    //
    //     const zipPath = path.join(__dirname, 'images.zip');
    //
    //     // 使用 zip-lib 创建带密码保护的压缩包
    //     await archiveFolder(tempDir, zipPath, {
    //         password: 'yourpassword', // 设置压缩包密码
    //         zlib: { level: 9 } // 设置压缩级别
    //     });
    //
    //     const fileBox = FileBox.fromFile(zipPath);
    //     await room.say(fileBox);
    //
    //     // 删除临时目录和压缩文件
    //     fs.rmdirSync(tempDir, { recursive: true });
    //     fs.unlinkSync(zipPath);
    // } catch (error) {
    //     console.error("Error downloading images or creating zip file:", error);
    //     fs.rmdirSync(tempDir, { recursive: true });
    //     if (fs.existsSync(path.join(__dirname, 'images.zip'))) {
    //         fs.unlinkSync(path.join(__dirname, 'images.zip'));
    //     }
    // }
};
