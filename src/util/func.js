/**
 * 通用工具类
 */
export default class func {

  /**
   * 生成随机密码 高强度
   * @returns {string}
   */
  static generateRandomPassword() {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + symbols;

    let password = '';

    // Ensure at least one character from each category
    password += this.getRandomCharacter(uppercaseLetters);
    password += this.getRandomCharacter(lowercaseLetters);
    password += this.getRandomCharacter(numbers);
    password += this.getRandomCharacter(symbols);

    // Fill the rest of the password with random characters
    for (let i = password.length; i < 12; i++) {
      password += this.getRandomCharacter(allCharacters);
    }

    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
  }

  static getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }
  /**
   * 不为空
   * @param val
   * @returns {boolean}
   */
  static notEmpty(val) {
    return !this.isEmpty(val);
  }

  /**
   * 是否为定义
   * @param val
   * @returns {boolean}
   */
  static isUndefined(val) {
    return val === null || typeof val === 'undefined';
  }

  /**
   * 为空
   * @param val
   * @returns {boolean}
   */
  static isEmpty(val) {
    if (
      val === null ||
      typeof val === 'undefined' ||
      (typeof val === 'string' && val === '' && val !== 'undefined')
    ) {
      return true;
    }
    return false;
  }

  /**
   * 强转int型
   * @param val
   * @param defaultValue
   * @returns {number}
   */
  static toInt(val, defaultValue) {
    if (this.isEmpty(val)) {
      return defaultValue === undefined ? -1 : defaultValue;
    }
    const num = parseInt(val, 0);
    return Number.isNaN(num) ? (defaultValue === undefined ? -1 : defaultValue) : num;
  }

  /**
   * Json强转为Form类型
   * @param obj
   * @returns {FormData}
   */
  static toFormData(obj) {
    const data = new FormData();
    Object.keys(obj).forEach(key => {
      data.append(key, Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]);
    });
    return data;
  }

  /**
   * date类转为字符串格式
   * @param date
   * @param format
   * @returns {null}
   */
  static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? date.format(format) : null;
  }

  /**
   * 根据逗号联合
   * @param arr
   * @returns {string}
   */
  static join(arr) {
    return Array.isArray(arr) ? arr.join(',') : arr;
  }

  /**
   * 根据逗号分隔
   * @param str
   * @returns {string}
   */
  static split(str) {
    return str ? String(str).split(',') : '';
  }

  /**
   * 转换空字符串
   * @param str
   * @returns {string|*}
   */
  static toStr(str) {
    if (typeof str === 'undefined' || str === null) {
      return "";
    }
    return str;
  }

  /**
   * 判断是否为数组
   * @param param
   * @returns {boolean}
   */
  static isArrayAndNotEmpty(param) {
    return Array.isArray(param) && param.length > 0;
  }

  /**
   * 格式化URL
   * @param url
   * @returns {*|string}
   */
  static formatUrl(url) {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `http://${url}`;
    }
  }
  /**
   * //获取url中"?"符后的字串
   * @param url
   * @returns {Object}
   * @constructor
   */
  static getRequestParams (url) {
    let urlStr = url.split('?')[1]
    const urlSearchParams = new URLSearchParams(urlStr)
    return Object.fromEntries(urlSearchParams.entries())
  }
}
