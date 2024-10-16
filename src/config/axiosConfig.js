/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import https from 'https';
//默认超时时间
axios.defaults.timeout = 60000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
};
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false, // 开发环境下忽略证书错误，生产环境请谨慎使用
    minVersion: 'TLSv1.1', // 设置最低 TLS 版本
})
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
//http request拦截
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});
//http response 拦截
axios.interceptors.response.use(res => {
    //获取状态码
    const status = res.status;
    if (status !== 200) {
        return Promise.resolve(new Error(res.data))
    }
    return res;
}, error => {
    return Promise.reject(new Error(error));
});
export default axios;
