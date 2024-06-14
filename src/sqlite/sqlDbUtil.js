import {Database} from './sqliteMain.js';
import '../util/newdate.js';
const db = new Database('./src/sqlite/data/myChat.db');
/**
 * 这个工具稍微抽象一些方法,以便直接操作数据库
 * @returns {Promise<void>} 无返回值
 */
export const sqlDbUtilInit = async ()=> {
// 建立连接

    try {
        // 创建聊天记录表
        await db.createTable(`CREATE TABLE IF NOT EXISTS chatHistory
                              (
                                  id       INTEGER PRIMARY KEY AUTOINCREMENT,
                                  messageId TEXT NOT NULL, -- '消息id'
                                  type   TEXT NOT NULL, -- '消息类型'
                                  text   TEXT NOT NULL, --  '消息内容'
                                  time     TEXT NOT NULL -- '时间'
                              )`);
        // 创建水群王记录表
        await db.createTable(`CREATE TABLE IF NOT EXISTS waterKing
                            (
                                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                                groupName TEXT NOT NULL, -- '群名称'
                                nameId   TEXT NOT NULL, --  '说话人id,建议记录说话人id和房间id'
                                name   TEXT NOT NULL, -- '说话人名称'
                                number   bigint NOT NULL, -- '说话次数'
                                roomId   TEXT NOT NULL, -- '房间id'
                                dateDay   TEXT NOT NULL, -- '日期逻辑方便筛选'
                                time     TEXT NOT NULL -- '时间'
                            )`);
    } catch (err) {
        console.error('操作失败', err);
    }finally {
        // 关闭数据库连接
    }
}
/**
 * 保存聊天记录
 * 自适应更新或插入
 */
export const saveChatHistory = async (messageId,type,text) => {

    try {
        // 先查询判断是否存在
        selectChatHistory(messageId).then(async (res)=>{
            if(res){
                // 存在则更新
                await db.update(`UPDATE chatHistory SET type = ?, text = ? WHERE messageId = ?`, [type, text, messageId]);
            }else{
                // 不存在则插入
                await db.insert(`INSERT INTO chatHistory (messageId, type, text, time)
                                 VALUES (?, ?, ?, ?)`, [messageId, type, text, new Date().Format("yyyyMMddHHmmss")]);
            }
        })
    }catch (err) {
        console.error('操作失败', err);
    }finally {
        // 关闭数据库连接
    }
}
/**
 * 查询聊天记录
 */
export const selectChatHistory = async (messageId) => {

    try {
        return await db.selectOne(`SELECT * FROM chatHistory WHERE messageId = ?`, [messageId]);
    }catch (err) {
        console.error('操作失败', err);
    }finally {
        // 关闭数据库连接
    }
}



/**
 * 保存水群王记录
 * 自适应更新或插入
 */
export const saveWaterKing = async (groupName,nameId,name,roomId,number) => {

    try {
        // 先查询判断是否存在
        selectWaterKing(nameId,roomId).then(async (res)=>{
            if(res){
                // 存在则更新
                await db.update(`UPDATE waterKing SET number = ? WHERE groupName = ? and nameId = ? and roomId = ? and dateDay = ?`, [number,groupName,nameId,roomId,new Date().Format("yyyyMMdd")]);
            }else{
                // 不存在则插入
                await db.insert(`INSERT INTO waterKing (groupName, nameId, name, number,roomId,dateDay, time)
                                 VALUES (?, ?, ?, ?, ?,?,?)`, [groupName, nameId, name, number,roomId, new Date().Format("yyyyMMdd"),new Date().Format("yyyyMMddHHmmss")]);
            }
        })
    }catch (err) {
        console.error('操作失败', err);
    }finally {
        // 关闭数据库连接
    }
}
/**
 * 查询单条水群王记录
 */
export const selectWaterKing = async (nameId,roomId) => {

    try {
        return await db.selectOne(`SELECT *
                                   FROM waterKing
                                   WHERE nameId = ?
                                     and roomId = ?
                                     and dateDay = ?`, [nameId, roomId, new Date().Format("yyyyMMdd")]);
    } catch (err) {
        console.error('操作失败', err);
    } finally {
        // 关闭数据库连接
    }
}
/**
 * 查询全部水群王记录
 */
export const selectAllWaterKing =  (roomId) => {
    return new Promise((resolve, reject) => {
        try {
            db.selectAll(`SELECT *
                          FROM waterKing
                          WHERE roomId = ?
                            and dateDay = ?`, [roomId, new Date().Format("yyyyMMdd")]).then(r =>{
                resolve(r);
            },err =>{
                reject(err);
            });
        } catch (err) {
             console.error('操作失败', err);
        } finally {
            // 关闭数据库连接
        }
    })

}
