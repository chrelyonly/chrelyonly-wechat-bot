import { spawn } from "child_process"
// import iconv from "iconv-lite"
// 先这样用 ,后面改到web端控制,  多开在线登录控制.....





/**
 * 获取信息
 */
export const getPm2Info = (room,bot)=>{
    // 执行 pm2 ls 命令
    const pm2 = spawn('pm2', ['ls']);

// 监听标准输出数据
    pm2.stdout.on('data', (data) => {
        // 使用 iconv-lite 将数据从 GBK 编码转换为 UTF-8
        // const output = iconv.decode(data, 'gbk');
        // console.log(`标准输出:\n${output}`);
        room.say(data)
    });

// 监听标准错误数据
    pm2.stderr.on('data', (data) => {
        // 使用 iconv-lite 将数据从 GBK 编码转换为 UTF-8
        // const output = iconv.decode(data, 'gbk');
        console.error(`错误输出:\n${data}`);
    });

// 监听子进程关闭事件
    pm2.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
    });

// 监听子进程错误事件
    pm2.on('error', (error) => {
        console.error(`子进程错误: ${error}`);
    });

}