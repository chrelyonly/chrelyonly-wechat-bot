import {Database} from "../sqliteMain.js";
import {
    messageKeywordsResponse,
    messageKeywordsResponseDbPath
} from "./myDivMessageResponseSqlDbUtil.js";
import {R} from "../../web/util/R.js";

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
    return new Promise(async (resolve, reject) => {
        await messageKeywordsResponse()
        const db = new Database(messageKeywordsResponseDbPath());
        try {
            // 先查询判断是否存在
            await selectMessageKeywordsResponse(parentId,id).then(async (res) => {
                // 如果修改成已经存在的关键字
                if (res && (res.id !== id)) {
                    resolve(R.fail("当前已经存重复内容" + content))
                    return;
                }
                if (id) {
                    // 存在则更新
                    await db.update(`UPDATE messageKeywordsResponse SET sort = ?, level = ? , parentId = ? ,content = ?,updateTime = ? , open = ? WHERE id = ?`, [sort, level, parentId,content,new Date().Format("yyyy-MM-dd HH:mm:ss"),open,id]);
                } else {
                    // 不存在则插入
                    await db.insert(`INSERT INTO messageKeywordsResponse (sort,level,parentId,content,updateTime, createTime, open,time)
                                 VALUES (?, ?, ?, ?,?,?,?,?)`, [sort, level, parentId,content,new Date().Format("yyyy-MM-dd HH:mm:ss"),new Date().Format("yyyy-MM-dd HH:mm:ss"),open,new Date().Format("yyyyMMddHHmmss")]);
                }
            })
            resolve(R.success("操作成功"))
        } catch (err) {
            console.error('操作失败', err);
            reject(R.fail("操作失败:" + err))
        } finally {
            // 关闭数据库连接
            await db.close();
        }
    })
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
export const selectMessageKeywordsResponse = async (parentId,id) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    try {
        return await db.selectOne(`SELECT * FROM messageKeywordsResponse WHERE parentId = ? and id = ?`, [parentId,id]);
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
export const selectMessageKeywordsResponsePage = async (parentId,current,size) => {
    await messageKeywordsResponse()
    const db = new Database(messageKeywordsResponseDbPath());
    const offset = (current - 1) * size; // 计算偏移量
    try {
        return await db.selectAll(`SELECT * FROM messageKeywordsResponse where parentId = ? limit ?,?`, [parentId,offset,size]);
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
