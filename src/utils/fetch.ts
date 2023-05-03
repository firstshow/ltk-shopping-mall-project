import axios from "axios"
import qs from "qs"
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

interface RequestOptions<D = any> {
  url?: string
  data?: D
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
  retryTimes?: number
  isMock?: boolean
  contentType?: string
  noToken?: boolean
  specialError?: boolean
  mockUrl?: string
}

// axios.defaults.baseURL = ''  //正式
axios.defaults.baseURL = 'https://group-guest-api.netmi.com.cn/' //测试

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
//允许跨域携带cookie信息
axios.defaults.withCredentials = true;
//设置超时
axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  config => {
    console.log('请求信息', config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log('请求失败', error);
  }
)

export const request = <T = any>(reqOptions: RequestOptions): Promise<T> => {
  let { method, data, url, noToken } = reqOptions
  return new Promise((resolve, reject) => {
    console.log('request', method, data, url, noToken)

    let reqData: any = {
      method,
      url,
      headers: {
        'X-Access-Token': noToken ? undefined : userStore.accessToken,
      }
    }

    if (method === 'GET') {
      reqData.params = data
    } else if (method === 'POST') {
      reqData.data = qs.stringify(data)
    }

    axios(reqData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      });
  })
}
