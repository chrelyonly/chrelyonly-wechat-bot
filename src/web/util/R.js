/**
 * 统一返回
 */
export class R {

    /**
     * 构造函数，初始化一个响应对象
     * @param {number} code - 状态码，默认为200
     * @param {any} data - 承载数据，默认为null
     * @param {string} msg - 返回消息，默认为"操作成功"
     */
    constructor(code = 200, data = null, msg = '操作成功') {
        this.code = code;        // 状态码
        this.data = data;        // 承载数据
        this.msg = msg;          // 返回消息
        this.success = code === 200;  // 是否成功，状态码为200时表示成功
    }

    /**
     * 检查响应是否表示成功
     * @param {R} result - R类的实例
     * @returns {boolean} - 如果成功返回true，否则返回false
     */
    static isSuccess(result) {
        return result && result.code === 200;
    }

    /**
     * 检查响应是否表示失败
     * @param {R} result - R类的实例
     * @returns {boolean} - 如果失败返回true，否则返回false
     */
    static isNotSuccess(result) {
        return !R.isSuccess(result);
    }

    /**
     * 创建一个包含数据的成功响应
     * @param {any} data - 承载数据
     * @param {string} msg - 返回消息，默认为"操作成功"
     * @returns {R} - 新的R类实例，表示成功的响应
     */
    static data(data, msg = '操作成功') {
        return new R(200, data, msg);
    }

    /**
     * 创建一个带有指定状态码的数据响应
     * @param {number} code - 状态码
     * @param {any} data - 承载数据
     * @param {string} msg - 返回消息，数据为null时默认为"暂无承载数据"
     * @returns {R} - 新的R类实例，表示带有自定义状态码的响应
     */
    static dataWithCode(code, data, msg) {
        return new R(code, data, msg || (data ? '操作成功' : '暂无承载数据'));
    }

    /**
     * 创建一个成功的响应，不带数据
     * @param {string} msg - 返回消息，默认为"操作成功"
     * @returns {R} - 新的R类实例，表示成功的响应
     */
    static success(msg = '操作成功') {
        return new R(200, null, msg);
    }

    /**
     * 创建一个带有指定状态码的成功响应，不带数据
     * @param {number} code - 状态码
     * @param {string} msg - 返回消息，默认为"操作成功"
     * @returns {R} - 新的R类实例，表示带有自定义状态码的成功响应
     */
    static successWithCode(code, msg = '操作成功') {
        return new R(code, null, msg);
    }

    /**
     * 创建一个失败的响应
     * @param {string} msg - 返回消息，默认为"操作失败"
     * @returns {R} - 新的R类实例，表示失败的响应
     */
    static fail(msg = '操作失败') {
        return new R(500, null, msg);
    }

    /**
     * 创建一个带有指定状态码的失败响应
     * @param {number} code - 状态码
     * @param {string} msg - 返回消息，默认为"操作失败"
     * @returns {R} - 新的R类实例，表示带有自定义状态码的失败响应
     */
    static failWithCode(code, msg = '操作失败') {
        return new R(code, null, msg);
    }

    /**
     * 根据布尔值返回成功或失败的响应
     * @param {boolean} flag - 如果为true则返回成功响应，否则返回失败响应
     * @returns {R} - 新的R类实例，表示成功或失败的响应
     */
    static status(flag) {
        return flag ? R.success() : R.fail();
    }
}