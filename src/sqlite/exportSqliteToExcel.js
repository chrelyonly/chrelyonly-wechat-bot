import XLSX from 'xlsx';
import {FileBox} from "file-box";
const {exportWaterKingToExcelByDate} = require("./sqlDbUtil.js");

// 导出数据为Excel字节数组
const exportToExcelBytes = async (roomId,date) => {
    try {
        const rows = await exportWaterKingToExcelByDate(roomId,date)
        // 将查询结果转换为工作簿
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // 写入Excel文件并获取字节数组
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        console.log('Data exported to Excel buffer successfully.');
        return excelBuffer;
    } catch (error) {
        console.error('Error exporting data:', error);
        return null;
    }
};

export const exportWaterKingToExcel = (room,date)=>{
    exportToExcelBytes(room.id,date).then((buffer) => {
        if (buffer) {
            const fileBox = FileBox.fromBuffer(buffer, `水群王${date}.xlsx`)
            room.say(fileBox)
        }
    });
}
