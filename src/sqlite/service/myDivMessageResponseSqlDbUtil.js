import {Database} from '../sqliteMain.js';
import '../util/newdate.js';


/**
 * 消息关键字数据库路径
 * @returns {string}
 */
const messageKeywordsDbPath = () => {
    return "./src/sqlite/data/messageKeywords.db";
}

/**
 * 消息关键字响应数据库路径
 * @returns {string}
 */
const messageKeywordsResponseDbPath = () => {
    return "./src/sqlite/data/messageKeywordsResponse.db";
}
/**
 * 这个工具稍微抽象一些方法,以便直接操作数据库
 * @returns {Promise<void>} 无返回值
 */
export const sqlDbUtilInit = async () => {
    const messageKeywordsDb = new Database(messageKeywordsDbPath());
    const messageKeywordsResponseDb = new Database(messageKeywordsResponseDbPath());
// 建立连接
    try {
        // 创建KEY表  ,主要用于根据key返回指定内容
        await messageKeywordsDb.createTable(`CREATE TABLE IF NOT EXISTS messageKeywords
                              (
                                  id       INTEGER PRIMARY KEY AUTOINCREMENT,
                                  sort   TEXT NOT NULL, -- '排序'
                                  label   TEXT NOT NULL, -- '描述'
                                  keyword   TEXT NOT NULL, -- '关键字 ["你好","hello"]'
                                  updateTime   TEXT NOT NULL, -- '修改日期'
                                  dateDay   TEXT NOT NULL, -- '日期逻辑方便筛选'
                                  time     TEXT NOT NULL -- '时间'
                              )`);
        // 创建value嫑 主要用于根据key嫑返回指定内容
        await messageKeywordsResponseDb.createTable(`CREATE TABLE IF NOT EXISTS messageKeywordsResponse
                            (
                                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                                sort   TEXT NOT NULL, -- '排序'
                                level   TEXT NOT NULL, -- '权重'
                                parentId   TEXT NOT NULL, -- 'keyId'
                                conent   TEXT NOT NULL, -- '内容 ["好啊","好nm"]'
                                updateTime   TEXT NOT NULL, -- '修改日期'
                                dateDay   TEXT NOT NULL, -- '日期逻辑方便筛选'
                                time     TEXT NOT NULL -- '时间'
                            )`);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await messageKeywordsDb.close();
        await messageKeywordsResponseDb.close();
    }
}







/**
 * 自定义回复数据库操作查询
 */
export const myDivMessageResponseSqlDbUtil = ()=>{

}