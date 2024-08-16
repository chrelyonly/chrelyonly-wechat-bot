import {Database} from "../sqliteMain.js";
import {messageKeywordsDbPath, messageKeywordsResponse} from "./myDivMessageResponseSqlDbUtil.js";

/**
 * 新增修改保存关键字
 * 自适应更新或插入
 * @returns {Promise<void>}
 * @param sort 排序
 * @param label 描述
 * @param keyword 关键字 111,222
 * @param open 开关 01
 * @param id id如果有的话
 */
export const saveOrUpdateMessageKeywords = async (sort,label,keyword,open,id) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsDbPath());
    try {
        // 先查询判断是否存在
        await selectMessageKeywords(keyword).then(async (res) => {
            if (res) {
                // 存在则更新
                await db.update(`UPDATE messageKeywords SET sort = ?, label = ? , keyword = ? ,updateTime = ? , open = ? WHERE id = ?`, [sort, label, keyword,new Date().Format("yyyyMMddHHmmss"),open,id]);
            } else {
                // 不存在则插入
                await db.insert(`INSERT INTO messageKeywords (sort,label,keyword,updateTime, createTime, open,time)
                                 VALUES (?, ?, ?, ?,?,?,?)`, [sort, label, keyword,new Date().Format("yyyy-MM-dd HH:mm:ss"),new Date().Format("yyyy-MM-dd HH:mm:ss"),open,new Date().Format("yyyyMMddHHmmss")]);
            }
        })
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await db.close();
    }
}

/**
 * 删除
 */
export const delMessageKeywords = async (id) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsDbPath());
    try {
        return await db.selectOne(`delete from messagekeywords where id IN(?)`, [id]);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await db.close();
    }
}

/**
 * 查询关键字,单条
 */
export const selectMessageKeywords = async (keyword) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsDbPath());
    try {
        return await db.selectOne(`SELECT * FROM messageKeywords WHERE keyword like ?`, ["%" + keyword + "%"]);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await db.close();
    }
}

/**
 * 查询关键字,list
 */
export const selectMessageKeywordList = async (current,size) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsDbPath());
    try {
        return await db.selectAll(`SELECT * FROM messageKeywords limit ?,?`, [current,size]);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await db.close();
    }
}
