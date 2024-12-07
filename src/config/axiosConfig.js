import axios from 'axios';

/**
 * 创建一个新的 Axios 实例
 * @param {object} config - 自定义配置对象
 * @returns {object} - Axios 实例
 */
const createAxiosInstance = (config = {}) => {
    const defaultConfig = {
        timeout: 30000, // 请求超时时间
        validateStatus: status => status >= 200 && status <= 500, // 默认的状态码验证
        withCredentials: true, // 允许跨域携带凭证
    };

    // 合并默认配置与传入配置
    const instance = axios.create({ ...defaultConfig, ...config });

    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(
        requestConfig => {
            // 请求发送前的逻辑
            console.log('发起请求:', {
                url: requestConfig.url,
                method: requestConfig.method,
                headers: requestConfig.headers,
                params: requestConfig.params,
                data: requestConfig.data,
            });
            return requestConfig;
        },
        error => {
            // 捕获请求阶段的错误
            console.error('请求拦截器错误:', {
                url: error?.config?.url,
                method: error?.config?.method,
                headers: error?.config?.headers,
                params: error?.config?.params,
                data: error?.config?.data,
                message: error.message,
            });
            return Promise.reject(error);
        }
    );

    /**
     * 响应拦截器
     */
    instance.interceptors.response.use(
        response => {
            const { status, data, config: resConfig } = response;

            if (status !== 200) {
                // 打印非 200 响应日志
                console.warn(`响应错误: ${status}`, data, {
                    url: resConfig.url,
                    method: resConfig.method,
                    headers: resConfig.headers,
                    params: resConfig.params,
                    data: resConfig.data,
                });
                return Promise.reject(new Error(data?.message || '未知错误'));
            }

            // 返回响应数据
            return response;
        },
        error => {
            // 捕获响应阶段的错误
            console.error('响应拦截器错误:', {
                url: error?.config?.url,
                method: error?.config?.method,
                headers: error?.config?.headers,
                params: error?.config?.params,
                data: error?.config?.data,
                message: error.message,
            });
            return Promise.reject(new Error(error.message || '网络错误'));
        }
    );

    return instance;
};

// 导出默认实例
export default createAxiosInstance();

/**
 * 导出实例创建函数，支持多实例创建
 * @example
 * const customAxios = createAxiosInstance({ baseURL: 'https://api.example.com' });
 */
export { createAxiosInstance };
