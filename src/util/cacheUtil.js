// import NodeCache from "node-cache";
// // 有期限的缓存
// const myCache = new NodeCache({ stdTTL: 120 }); // 缓存有效时间为60秒，即1分钟
// export function setCache(key, value,time = 60 * 60 * 24 * 30 * 12) {
//     myCache.set(key, value,time);
// }
// export function delCache(key) {
//     myCache.del(key);
// }
// export function getCache(key) {
//     return myCache.get(key);
// }
// export function getCacheAll(prefix) {
//     const keys = myCache.keys(); // 获取所有的键
//     const result = [];
//     keys.forEach((key) => {
//         if (key.startsWith(prefix)) {
//             result.push(myCache.get(key));
//         }
//     });
//     return result;
// }
