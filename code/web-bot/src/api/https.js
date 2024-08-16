import request from '@/axios/axiosConfig.js';
/**
 * this1.$https("/api/er/orderCancel","post",{"ids":this1.ids},1,{}).then((res) => {
         this1.$message.success(res.data.msg)
     })
 */
/**
 * 用法
 * 自定义全局通用方法传入
 * @param url 请求地址
 * @param method 方法  get post
 * @param params 参数 a={} 或者 {a:1},{b:2]
 * @param type 类型   1       2
 * @param headers 请求头{}
 * @returns {*}
 */
export const http = (url,method, params,type,headers) => {
  if(type === 1){
    return requestApi(url,method,params,type,headers)
  }else if(type === 2){
    return requestApi2(url,method,params,type,headers)
  }
}
/**
 * 请求提交接口
 * 作为一个对象传输
 */
function requestApi(url,method,params,type,headers){
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
function requestApi2(url,method,params,type,headers){
  return request({
    url: url,
    method: method,
    headers: headers,
    data: params
  })
}

