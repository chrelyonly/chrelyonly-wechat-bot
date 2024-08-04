import {Database} from "../sqliteMain.js";
import {
    messageKeywordsResponse,
    messageKeywordsResponseDbPath
} from "./myDivMessageResponseSqlDbUtil.js";

/**
 * 新增修改保存关键字
 * 自适应更新或插入
 * @returns {Promise<void>}
 * @param sort 排序
 * @param level
 * @param parentId
 * @param content
 * @param open 开关 01
 * @param id id如果有的话
 */
export const saveOrUpdateMessageKeywordsResponse = async (sort,level,parentId,content,open,id) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        // 先查询判断是否存在
        await selectMessageKeywordsResponse(parentId).then(async (res) => {
            if (res) {
                // 存在则更新
                await db.update(`UPDATE messageKeywordsResponse SET sort = ?, level = ? , parentId = ? ,content = ?,updateTime = ? , open = ? WHERE id = ?`, [sort, level, parentId,content,new Date().Format("yyyyMMddHHmmss"),open,id]);
            } else {
                // 不存在则插入
                await db.insert(`INSERT INTO messageKeywordsResponse (sort,level,parentId,content,updateTime, createTime, open,time)
                                 VALUES (?, ?, ?, ?,?,?,?,?,?)`, [sort, level, parentId,content,new Date().Format("yyyy-MM-dd HH:mm:ss"),new Date().Format("yyyy-MM-dd HH:mm:ss"),open,new Date().Format("yyyyMMddHHmmss")]);
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
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        return await db.selectOne(`delete from messageKeywordsResponse where id IN(?)`, [id]);
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
export const selectMessageKeywordsResponse = async (id) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        return await db.selectOne(`SELECT * FROM messageKeywordsResponse WHERE id = ?`, [id]);
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
export const selectMessageKeywordsResponsePage = async (current,size) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        return await db.selectAll(`SELECT * FROM messageKeywordsResponse limit ?,?`, [current,size]);
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
export const selectMessageKeywordsResponseList = async (parentId) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        return await db.selectAll(`SELECT * FROM messageKeywordsResponse where parentId = ?`, [parentId]);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
        await db.close();
    }
}
