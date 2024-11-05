import request from '../config/axiosConfig.js';

/**
 * 用法
 * 自定义全局通用方法传入
 * @param url 请求地址
 * @param method 方法  get post
 * @param params 参数 a={} 或者 {a:1},{b:2]
 * @param type 类型   1       2
 * @param headers 请求头{}
 * @param proxy 代理
 * @returns {*}
 */
export const http = (url, method, params, type, headers,proxy = undefined) => {
    if (type === 1) {
        return requestApi(url, method, params, type, headers)
    } else if (type === 2) {
        return requestApi2(url, method, params, type, headers)
    } else if (type === 3) {
        return requestApi3(url, method, params, type, headers,proxy)
    } else if (type === 4) {
        return requestApi4(url, method, params, type, headers)
    } else if (type === 5) {
        return requestApi5(url, method, params, type, headers)
    }else {
        return new Promise((resolve, reject) => {
            resolve("不支持的请求")
        })
    }
};


/**
 * 请求提交接口
 * 作为一个对象传输
 */
function requestApi(url, method, params, type, headers) {
    return request({
        url: url,
        method: method,
        headers: headers,
        params: {
            ...params
        }
    })
}

/**
 * 请求提交接口
 * 作为多个对象
 */
function requestApi2(url, method, params, type, headers) {
    return request({
        url: url,
        method: method,
        headers: headers,
        data: params,
    })
}

/**
 * 文件流 参数在url上,返回arraybuffer
 */
function requestApi3(url, method, params, type, headers,proxy) {
    return request({
        url: url,
        method: method,
        headers: headers,
        params: {
            ...params
        },
        responseType: 'arraybuffer',
        httpsAgent: proxy,

        // 这里以后可能会以参数传进来.............................
        onDownloadProgress: progressEvent  => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total); // 计算进度百分比
            console.log(`下载进度: ${progress}%`);
        },
        onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / (total || 0));  // 计算进度百分比
            console.log(`上传进度: ${progress}%`);
        },
    })
}

/**
 * 文件流 是参数在body上,返回stream
 */
function requestApi4(url, method, params, type, headers) {
    return request({
        url: url,
        method: method,
        headers: headers,
        data: params,
        responseType: 'stream',
        // 这里以后可能会以参数传进来.............................
        onDownloadProgress: progressEvent  => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total); // 计算进度百分比
            console.log(`下载进度: ${progress}%`);
        },
        onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / (total || 0));  // 计算进度百分比
            console.log(`上传进度: ${progress}%`);
        },
    })
}

/**
 * 文件流 是参数在body上,返回arraybuffer
 */
function requestApi5(url, method, params, type, headers) {
    return request({
        url: url,
        method: method,
        headers: headers,
        data: params,
        responseType: 'arraybuffer',
        // 这里以后可能会以参数传进来.............................
        onDownloadProgress: progressEvent  => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total); // 计算进度百分比
            console.log(`下载进度: ${progress}%`);
        },
        onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / (total || 0));  // 计算进度百分比
            console.log(`上传进度: ${progress}%`);
        },
    })
}
