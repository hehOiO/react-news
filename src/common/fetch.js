import axios from 'axios'

// import { Message } from 'iview'
let baseURL
let wokertURl
let url=window.location.host;

if(process.env.NODE_ENV==='development'){
  baseURL='http://127.0.0.1:4300'
  // baseURL='http://baou.neurotech.cn/neuroCloud'
  wokertURl='192.168.97.103/'
}else{
  baseURL='/'
  wokertURl=url+'/'
}

// 创建axios实例detect 
const service = axios.create({
  // baseURL: 'http://192.168.97.112/neuroCloud', // api的base_url
  // baseURL: 'http://106.75.15.138:8080/v1',
  // baseURL: 'http://192.168.97.115:80/neuroCloud', // 小兵   ...
  // baseURL: 'https://bicuc.com:8443/neuroCloud', // 
  // baseURL: 'https://192.168.97.106:8443/neuroCloud', // 内网测试专用
  // baseURL: 'http://192.168.97.210:80/neuroCloud', // 小斌
  baseURL:baseURL , // 开发测试专用
  // baseURL: 'http://192.168.1.200:80/neuroCloud',
  // baseURL: 'http://106.75.32.181:8080/neuroCloud', // 使用环境测试专用   ...
  // baseURL: 'http://192.168.97.108:8080/neuroCloud', // 测试用测试环境
  // baseURL: 'http://120.27.218.181:80/neuroCloud', // 云端
  // timeout: 10000, // 请求超时时间
  contentType: 'application/json',
})
service.baseURL=baseURL;
service.wokertURl=wokertURl;
// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    // 解决ie上请求缓存的问题
    if(config.params !== '' && config.params !== undefined){
      var myTime = new Date();
      myTime = myTime.valueOf();
      config.params['ieTime'] = myTime;
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {

    // let data=response.data;
    // if(data.code===200||data.code===304||data.code===404||data.code===602||data.code==530){
      return response
    // }
    // else {
    //   window.Vue.$alert('数据丢失啦')
    //   return Promise.reject(response)
    //
    // }
  },

  error => {
    // console.log(error)


    // newVue.$titlAlert('网络异常','error');
    // console.log(error.response) // for debug
    // console.log(error.config) // for debug
    // console.log(error.message) // for debug
    // alert('网络异常，请稍后再试！')
    // Message.error('网络异常，请稍后再试！')
    // location.reload()
    return Promise.reject(error)
  }
)

export default service
