import os from 'os';

export const  getSystemInfo = () => {
    let info = '';
    // 获取系统网络地址
    const networkInterfaces = os.networkInterfaces();
    info += '网络地址:\n';
    for (const item in networkInterfaces) {
        networkInterfaces[item].forEach((details) => {
            if (details.family === 'IPv4') {
                info += `  ${item}: ${details.address}\n`;
            }
        });
    }

    // 获取主机名
    const hostname = os.hostname();
    info += `主机名: ${hostname}\n`;

    // 获取系统总内存和可用内存
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    info += `总内存: ${(totalMemory / (1024 ** 3)).toFixed(2)} GB\n`;
    info += `可用内存: ${(freeMemory / (1024 ** 3)).toFixed(2)} GB\n`;

    // 获取CPU信息
    const cpus = os.cpus();
    info += 'CPU信息:\n';
    cpus.forEach((cpu, index) => {
        info += `  CPU ${index + 1}: ${cpu.model}\n`;
    });

    // 获取操作系统信息
    const osType = os.type();
    const osRelease = os.release();
    const platform = os.platform();
    info += `操作系统: ${osType} ${osRelease} (${platform})\n`;

    // 获取系统运行时间
    const uptime = os.uptime();
    info += `系统运行时间: ${(uptime / 3600).toFixed(2)} 小时\n`;

    // 获取当前用户信息
    const userInfo = os.userInfo();
    info += `当前用户: ${userInfo.username}\n`;

    return info;
}
