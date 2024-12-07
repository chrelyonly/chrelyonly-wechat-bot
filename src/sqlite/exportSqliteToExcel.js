import XLSX from 'xlsx';
import { FileBox } from "file-box";
import { exportWaterKingToExcelByDate } from "./waterKing/wechatKingSqlDbUtil.js";

/**
 * 导出数据为Excel字节数组
 * @param {string} roomId 房间ID
 * @param {string} date 日期
 * @returns {Promise<Buffer|null>} 返回Excel字节数组
 */
const exportToExcelBytes = (roomId, date) => {
    return exportWaterKingToExcelByDate(roomId, date)
        .then(rows => {
            const worksheet = XLSX.utils.json_to_sheet(
                rows.map(row =>
                    Object.fromEntries(
                        Object.entries(row).map(([key, value]) => {
                            if (typeof value === 'string' && value.length > 32767) {
                                value = "导出图片有点小问题,可能出现内存溢出,不导出";
                            }
                            return [key, value];
                        })
                    )
                )
            );
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'buffer' });
            console.log('Data exported to Excel buffer successfully.');
            return excelBuffer;
        })
        .catch(error => {
            console.error('Error exporting data:', error);
            return null;
        });
};

/**
 * 导出水群王数据为Excel并发送
 * @param {object} room 房间对象
 * @param {string} date 日期
 */
export const exportWaterKingToExcel = (room, date) => {
    exportToExcelBytes(room.id, date).then(buffer => {
        if (buffer) {
            const fileBox = FileBox.fromBuffer(buffer, `水群王${date}.xlsx`);
            room.say(fileBox);
        }
    }).catch(err => {
        console.error('Error in exporting to Excel:', err);
    });
};
