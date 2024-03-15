import NodeCache from  "node-cache";
const myCache = new NodeCache({ stdTTL: 120 }); // 缓存有效时间为60秒，即1分钟

export function setCache(key, value) {
    myCache.set(key, value);
}
export function getCache(key) {
    return myCache.get(key);
}