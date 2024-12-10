import { Database } from '../sqliteMain.js';
import '../../util/newdate.js';

/**
 * 获取当前数据库路径（按天分库）
 * @returns {string}
 */
function getDbPath() {
    const date = new Date().Format("yyyyMMdd");
    return `./src/sqlite/data/wechatKing${date}.db`;
}

/**
 * 通用的数据库执行工具函数
 * @param {Function} queryFunction - 查询方法
 * @param {Array} params - 查询参数
 * @returns {Promise<any>}
 */
const executeDbQuery = (queryFunction, params) => {
    const db = new Database(getDbPath());
    return queryFunction(db, ...params)
        .finally(() => db.close())
        .catch(err => {
            console.error('操作失败', err);
            throw err;
        });
};

/**
 * 初始化数据库表
 * @returns {Promise<void>}
 */
export const sqlDbUtilInit = () => {
    return executeDbQuery(db => {
        return Promise.all([
            db.createTable(`CREATE TABLE IF NOT EXISTS chatHistory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roomId TEXT NOT NULL,
                groupName TEXT NOT NULL,
                nameId TEXT NOT NULL,
                name TEXT NOT NULL,
                messageId TEXT NOT NULL,
                type TEXT NOT NULL,
                text TEXT NOT NULL,
                dateDay TEXT NOT NULL,
                time TEXT NOT NULL
            )`),
            db.createTable(`CREATE TABLE IF NOT EXISTS waterKing (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                groupName TEXT NOT NULL,
                nameId TEXT NOT NULL,
                name TEXT NOT NULL,
                number BIGINT NOT NULL,
                roomId TEXT NOT NULL,
                dateDay TEXT NOT NULL,
                time TEXT NOT NULL
            )`)
        ]);
    }, []);
};

/**
 * 保存聊天记录
 */
export const saveChatHistory = (roomId, groupName, nameId, name, messageId, type, text) => {
    return executeDbQuery(db => {
        return db.selectOne('SELECT * FROM chatHistory WHERE messageId = ?', [messageId])
            .then(existingRecord => {
                if (existingRecord) {
                    return db.update('UPDATE chatHistory SET type = ?, text = ? WHERE messageId = ?', [type, text, messageId]);
                } else {
                    return db.insert('INSERT INTO chatHistory (roomId, groupName, nameId, name, messageId, type, text, dateDay, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        roomId, groupName, nameId, name, messageId, type, text, new Date().Format('yyyyMMdd'), new Date().Format('yyyyMMddHHmmss')
                    ]);
                }
            });
    }, []);
};

/**
 * 查询聊天记录
 */
export const selectChatHistory = (messageId) => {
    return executeDbQuery(db => db.selectOne('SELECT * FROM chatHistory WHERE messageId = ?', [messageId]), []);
};

/**
 * 保存水群王记录
 */
export const saveWaterKing = (groupName, nameId, name, roomId, number) => {
    return executeDbQuery(db => {
        return db.selectOne('SELECT * FROM waterKing WHERE nameId = ? AND roomId = ? AND dateDay = ?', [nameId, roomId, new Date().Format('yyyyMMdd')])
            .then(existingRecord => {
                if (existingRecord) {
                    return db.update('UPDATE waterKing SET number = ? WHERE groupName = ? AND nameId = ? AND roomId = ? AND dateDay = ?', [number, groupName, nameId, roomId, new Date().Format('yyyyMMdd')]);
                } else {
                    return db.insert('INSERT INTO waterKing (groupName, nameId, name, number, roomId, dateDay, time) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                        groupName, nameId, name, number, roomId, new Date().Format('yyyyMMdd'), new Date().Format('yyyyMMddHHmmss')
                    ]);
                }
            });
    }, []);
};

/**
 * 查询水群王记录
 */
export const selectWaterKing = (nameId, roomId) => {
    return new Promise((resolve, reject) => {
        sqlDbUtilInit().then(()=>{
            resolve(executeDbQuery(db => db.selectOne('SELECT * FROM waterKing WHERE nameId = ? AND roomId = ? AND dateDay = ?', [nameId, roomId, new Date().Format('yyyyMMdd')]), []))
        })
    })
};

/**
 * 查询全部水群王记录
 */
export const selectAllWaterKing = (roomId) => {
    return executeDbQuery(db => db.selectAll('SELECT * FROM waterKing WHERE roomId = ? AND dateDay = ?', [roomId, new Date().Format('yyyyMMdd')]), []);
};

/**
 * 导出数据库为 Excel
 */
export const exportWaterKingToExcelByDate = (roomId, date) => {
    return executeDbQuery(db => db.selectAll('SELECT * FROM chatHistory WHERE roomId = ? AND dateDay = ?', [roomId, date]), []);
};
