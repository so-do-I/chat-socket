import axios from 'axios'
import {frontEndExceptionRoute} from './APIRoutes'
axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    postRequest(frontEndExceptionRoute,{
      event:"interface_exception",
      type:"error_message",
      params:{
        message:data.data.msg,
        time:new Date().getTime()
      }   
    })
    return;
  }
  return data;
}, err=> {
    postRequest(frontEndExceptionRoute,{
      event:"interface_exception",
      type:"error_message",
      params:{
        message:err,
        time:new Date().getTime()
      }   
    })
    return Promise.resolve(err)
})

let base = "http://182.192.133.82:8086/proxy";

export const postRequest = (url:string, params:any) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
  });
}

export const getRequest = (url:string) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}