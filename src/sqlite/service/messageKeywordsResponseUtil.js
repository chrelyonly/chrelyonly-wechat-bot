import { Database } from "../sqliteMain.js";
import {
    messageKeywordsResponse,
    messageKeywordsResponseDbPath
} from "./myDivMessageResponseSqlDbUtil.js";
import { R } from "../../web/util/R.js";

export const saveOrUpdateMessageKeywordsResponse = (sort, level, parentId, content, open, id) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsResponseDbPath());
            selectMessageKeywordsResponse(parentId, id)
                .then(res => {
                    if (res && (res.id !== id)) {
                        resolve(R.fail("当前已经存重复内容" + content));
                        return;
                    }
                    const currentTime = new Date().toISOString().replace("T", " ").slice(0, 19);
                    if (id) {
                        db.update(
                            `UPDATE messageKeywordsResponse SET sort = ?, level = ?, parentId = ?, content = ?, updateTime = ?, open = ? WHERE id = ?`,
                            [sort, level, parentId, content, currentTime, open, id]
                        ).then(() => resolve(R.success("操作成功"))).catch(err => reject(R.fail("操作失败:" + err)));
                    } else {
                        db.insert(
                            `INSERT INTO messageKeywordsResponse (sort, level, parentId, content, updateTime, createTime, open, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                            [sort, level, parentId, content, currentTime, currentTime, open, Date.now().toString()]
                        ).then(() => resolve(R.success("操作成功"))).catch(err => reject(R.fail("操作失败:" + err)));
                    }
                })
                .catch(err => reject(R.fail("操作失败:" + err)))
                .finally(() => db.close());
        });
    });
};

export const delMessageKeywords = (id) => {
    messageKeywordsResponse().then(() => {
        const db = new Database(messageKeywordsResponseDbPath());
        db.selectOne(`DELETE FROM messageKeywordsResponse WHERE id IN(?)`, [id])
            .then(res => console.log("删除成功", res))
            .catch(err => console.error("操作失败", err))
            .finally(() => db.close());
    });
};

export const selectMessageKeywordsResponse = (parentId, id) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsResponseDbPath());
            db.selectOne(`SELECT * FROM messageKeywordsResponse WHERE parentId = ? AND id = ?`, [parentId, id])
                .then(resolve)
                .catch(err => {
                    console.error("操作失败", err);
                    reject(err);
                })
                .finally(() => db.close());
        });
    });
};

export const selectMessageKeywordsResponsePage = (parentId, current, size) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsResponseDbPath());
            const offset = (current - 1) * size;
            db.selectAll(`SELECT * FROM messageKeywordsResponse WHERE parentId = ? LIMIT ?, ?`, [parentId, offset, size])
                .then(resolve)
                .catch(err => {
                    console.error("操作失败", err);
                    reject(err);
                })
                .finally(() => db.close());
        });
    });
};

export const selectMessageKeywordsResponseList = (parentId) => {
    return new Promise((resolve, reject) => {
        messageKeywordsResponse().then(() => {
            const db = new Database(messageKeywordsResponseDbPath());
            db.selectAll(`SELECT * FROM messageKeywordsResponse WHERE parentId = ? AND open = 1`, [parentId])
                .then(resolve)
                .catch(err => {
                    console.error("操作失败", err);
                    reject(err);
                })
                .finally(() => db.close());
        });
    });
};
