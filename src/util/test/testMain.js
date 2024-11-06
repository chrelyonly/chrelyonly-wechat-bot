import "../newdate.js"

function extractUrl(text) {
    const regex = /https?:\/\/\S+/g;  // 匹配http或https开头的URL
    return text.match(regex);  // 返回所有匹配的URL
}

// 示例用法
const inputText = "3.58 复制打开抖音，看看【爱莉爱莉爱的作品】爱莉翻唱⟪雾里⟫‶你在雾里，我看不清你″# 崩坏3... https://v.douyin.com/iALmU4AB/ 01/07 vFu:/ t@e.bN";
const urls = extractUrl(inputText);

console.log(urls[0]);  // 输出：["https://v.douyin.com/iAL5b9aq/"]
