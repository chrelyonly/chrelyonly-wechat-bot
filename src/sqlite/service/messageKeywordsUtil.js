import { Database } from "../sqliteMain.js";
import { messageKeywordsDbPath, messageKeywordsResponse } from "./myDivMessageResponseSqlDbUtil.js";
import { R } from "../../web/util/R.js";

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
export const saveOrUpdateMessageKeywords = (sort, label, keyword, open, id) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsDbPath());
            selectMessageKeywords(keyword)
                .then(res => {
                    if (res && res.id !== id) {
                        resolve(R.fail("当前已经存在关键字:" + keyword));
                        return;
                    }

                    const currentTime = new Date().toISOString().replace("T", " ").slice(0, 19);
                    if (id) {
                        db.update(
                            `UPDATE messageKeywords SET sort = ?, label = ?, keyword = ?, updateTime = ?, open = ? WHERE id = ?`,
                            [sort, label, keyword, currentTime, open, id]
                        )
                            .then(() => resolve(R.success("操作成功")))
                            .catch(err => reject(R.fail("操作失败:" + err)));
                    } else {
                        db.insert(
                            `INSERT INTO messageKeywords (sort, label, keyword, updateTime, createTime, open, time)
                             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            [sort, label, keyword, currentTime, currentTime, open, Date.now().toString()]
                        )
                            .then(() => resolve(R.success("操作成功")))
                            .catch(err => reject(R.fail("操作失败:" + err)));
                    }
                })
                .catch(err => reject(R.fail("操作失败:" + err)))
                .finally(() => db.close());
        });
    });
};

/**
 * 删除
 */
export const delMessageKeywords = (id) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsDbPath());
            db.selectOne(`DELETE FROM messagekeywords WHERE id IN(?)`, [id])
                .then(res => resolve(res))
                .catch(err => reject(err))
                .finally(() => db.close());
        });
    });
};

/**
 * 查询关键字,单条
 */
export const selectMessageKeywords = (keyword) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsDbPath());
            db.selectOne(`SELECT * FROM messageKeywords WHERE keyword LIKE ?`, [`%${keyword}%`])
                .then(resolve)
                .catch(err => {
                    console.error("操作失败", err);
                    reject(err);
                })
                .finally(() => db.close());
        });
    });
};

/**
 * 查询关键字,list
 */
export const selectMessageKeywordList = (current, size) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsDbPath());
            const offset = (current - 1) * size;
            db.count(`SELECT count(*) as count FROM messageKeywords`, [])
                .then(countResult => {
                    const count = countResult[0]["count"];
                    db.selectAll(`SELECT * FROM messageKeywords LIMIT ?, ?`, [offset, size])
                        .then(data => resolve({ count, data }))
                        .catch(err => {
                            console.error("查询数据失败", err);
                            reject(err);
                        })
                        .finally(() => db.close());
                })
                .catch(err => {
                    console.error("查询总数失败", err);
                    reject(err);
                });
        });
    });
};
