import {Database} from '../sqliteMain.js';
import '../../util/newdate.js';


/**
 * 消息关键字数据库路径
 * @returns {string}
 */
export const messageKeywordsDbPath = () => {
    return "./src/sqlite/data/messageKeywords.db";
}

/**
 * 消息关键字响应数据库路径
 * @returns {string}
 */
export const messageKeywordsResponseDbPath = () => {
    return "./src/sqlite/data/messageKeywordsResponse.db";
}
/**
 * 这个工具稍微抽象一些方法,以便直接操作数据库
 * @returns {Promise<void>} 无返回值
 */
export const messageKeywordsResponse = async () => {
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
                                  keyword   TEXT NOT NULL, -- '关键字 你好,hello'
                                  updateTime   TEXT NOT NULL, -- '修改日期'
                                  createTime   TEXT NOT NULL, -- '日期逻辑方便筛选'
                                  open   TEXT NOT NULL, -- '开关'
                                  time     TEXT NOT NULL -- '时间'
                              );
                                CREATE INDEX idx_sort ON messageKeywords(sort);
                                CREATE INDEX idx_label ON messageKeywords(label);
                                CREATE INDEX idx_keyword ON messageKeywords(keyword);
                                CREATE INDEX idx_updateTime ON messageKeywords(updateTime);
                                CREATE INDEX idx_createTime ON messageKeywords(createTime);
                              `);
        // 创建value嫑 主要用于根据key嫑返回指定内容
        await messageKeywordsResponseDb.createTable(`CREATE TABLE IF NOT EXISTS messageKeywordsResponse
                            (
                                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                                sort   TEXT NOT NULL, -- '排序'
                                level   TEXT NOT NULL, -- '权重'
                                parentId   TEXT NOT NULL, -- 'keyId'
                                content   TEXT NOT NULL, -- '内容 '
                                updateTime   TEXT NOT NULL, -- '修改日期'
                                createTime   TEXT NOT NULL, -- '日期逻辑方便筛选'
                                open   TEXT NOT NULL, -- '开关'
                                time     TEXT NOT NULL -- '时间'
                            );
                            CREATE INDEX idx_sort ON messageKeywordsResponse(sort);
                            CREATE INDEX idx_level ON messageKeywordsResponse(level);
                            CREATE INDEX idx_parentId ON messageKeywordsResponse(parentId);
                            CREATE INDEX idx_updateTime ON messageKeywordsResponse(updateTime);
                            
                            `);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await messageKeywordsDb.close();
        await messageKeywordsResponseDb.close();
    }
}




