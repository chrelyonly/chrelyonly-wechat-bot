import axios from 'axios';

// 创建独立的 axios 实例
const createAxiosInstance = (config = {}) => {
    const instance = axios.create({
        timeout: 30000,
        validateStatus: status => status >= 200 && status <= 500,
        withCredentials: true,
        ...config,
        // 支持传入其他自定义配置
    });

    // 请求拦截器
    instance.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            // 打印请求错误，包括请求地址、参数和请求头
            console.error('请求错误:', {
                url: error.config.url,
                method: error.config.method,
                headers: error.config.headers,
                params: error.config.params,
                data: error.config.data,
                message: error.message,
            });
            return Promise.reject(error)
        }
    );

    // 响应拦截器
    instance.interceptors.response.use(
        res => {
            const status = res.status;
            if (status !== 200) {
                // 打印响应错误
                console.error(`响应错误: ${status}`, res.data, {
                    url: res.config.url,
                    method: res.config.method,
                    headers: res.config.headers,
                    params: res.config.params,
                    data: res.config.data,
                });
                return Promise.reject(new Error(res.data));
            }
            return res;
        },
        error => {
            // 捕获并打印错误日志，包括请求的详细信息
            console.error('请求异常:', {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers,
                params: error.config?.params,
                data: error.config?.data,
                message: error.message,
            });
            return Promise.reject(new Error(error))
        }
    );

    return instance;
};

export default createAxiosInstance();
