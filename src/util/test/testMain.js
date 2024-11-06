import "../newdate.js"

function extractUrl(text) {
    const regex = /https?:\/\/\S+/g;  // 匹配http或https开头的URL
    return text.match(regex);  // 返回所有匹配的URL
}

// 示例用法
const inputText = "7.92 J@i.pD kPX:/ 01/17 第1～5集:虾仁穿越意123123123123外躺在棺中 # 原创动画 # 沙雕动画大合集 # 原创视频 # 原创动漫 # 沙雕剧情系列 https://v.douyin.com/iAL5b9aq/ 复制此链接，打开Dou音搜索，直接观看视频！";
const urls = extractUrl(inputText);

console.log(urls[0]);  // 输出：["https://v.douyin.com/iAL5b9aq/"]
