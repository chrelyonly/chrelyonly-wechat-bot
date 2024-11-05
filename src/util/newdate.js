// 对 Date 的扩展，将 Date 转化为指定格式的 String
// 月(M)、日(d 或 D)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y 或 Y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("YYYY-MM-DD hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("YYYY-M-D h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) {
        const o = {
            "M+": this.getMonth() + 1,                 // 月份
            "d+": this.getDate(),                        // 日
            "D+": this.getDate(),                        // 日 (大写)
            "h+": this.getHours(),                       // 小时 (12小时制)
            "H+": this.getHours(),                       // 小时 (24小时制)
            "m+": this.getMinutes(),                     // 分
            "s+": this.getSeconds(),                     // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds()                  // 毫秒
        };

        // 替换年份
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
        } else if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
        }

        // 替换其他格式
        for (const [key, value] of Object.entries(o)) {
            const regex = new RegExp(`(${key})`);
            if (regex.test(fmt)) {
                fmt = fmt.replace(regex, (regex.exec(fmt)[0].length === 1) ? value : String(value).padStart(2, '0'));
            }
        }

        return fmt;
    };
