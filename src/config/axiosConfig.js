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
        error => Promise.reject(error)
    );

    // 响应拦截器
    instance.interceptors.response.use(
        res => {
            const status = res.status;
            if (status !== 200) {
                return Promise.reject(new Error(res.data));
            }
            return res;
        },
        error => Promise.reject(new Error(error))
    );

    return instance;
};

export default createAxiosInstance();
