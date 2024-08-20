import sqlite3 from 'sqlite3';
import {log} from "wechaty";

/**
 * 数据库操作类
 * @author chrelyonly
 */
class Database {
    /**
     * 构造器
     * @param dbFilePath 路径名
     * @param maxRetries 最大重试次数
     * @param retryInterval 重试间隔
     */
    constructor(dbFilePath, maxRetries = 5, retryInterval = 1000) {
        this.dbFilePath = dbFilePath;
        this.maxRetries = maxRetries;
        this.retryInterval = retryInterval;
        this.db = null;
        this.connect();
    }

    // 连接数据库
    connect(retries = 0) {
        this.db = new sqlite3.Database(this.dbFilePath, (err) => {
            if (err) {
                console.error(`无法连接到数据库: ${err.message}`);
                if (retries < this.maxRetries) {
                    log.info(`重试连接 (${retries + 1}/${this.maxRetries})...`);
                    setTimeout(() => this.connect(retries + 1), this.retryInterval);
                } else {
                    console.error('已达到最大重试次数，无法连接到数据库');
                }
            } else {
                // log.info('已连接到数据库');
            }
        });
    }

    // 确保连接有效
    ensureConnected() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve();
            } else {
                log.info('尝试重新连接数据库...');
                this.connect();
                setTimeout(() => {
                    if (this.db) {
                        resolve();
                    } else {
                        reject('无法重新连接到数据库');
                    }
                }, this.retryInterval);
            }
        });
    }

    // 创建表
    createTable(sql) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.run(sql, (err) => {
                    if (err) {
                        console.error('无法创建表', err);
                        reject(err);
                    } else {
                        // log.info('表已创建');
                        resolve(true);
                    }
                });
            });
        });
    }

    // 插入数据
    insert(sql, params) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.run(sql, params, function (err) {
                    if (err) {
                        console.error('无法插入数据', err);
                        reject(err);
                    } else {
                        // log.info(`插入了一行数据，行ID为 ${this.lastID}`);
                        resolve(this.lastID);
                    }
                });
            });
        });
    }

    // 更新数据
    update(sql, params) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.run(sql, params, function (err) {
                    if (err) {
                        console.error('无法更新数据', err);
                        reject(err);
                    } else {
                        // log.info(`更新了 ${this.changes} 行数据`);
                        resolve(this.changes);
                    }
                });
            });
        });
    }

    // 查询单条数据
    selectOne(sql, params = []) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.get(sql, params, (err, row) => {
                    if (err) {
                        console.error('无法查询数据', err);
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });
        });
    }
//计数
    count(sql, params = []) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        console.error('无法查询数据', err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    // 查询所有数据
    selectAll(sql, params = []) {
        return this.ensureConnected().then(() => {
            return new Promise((resolve, reject) => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        console.error('无法查询数据', err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        });
    }

    // 关闭数据库连接
    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('无法关闭数据库连接', err);
                    reject(err);
                } else {
                    // log.info('数据库连接已关闭');
                    resolve(true);
                }
            });
        });
    }
}

export {
    Database
}
