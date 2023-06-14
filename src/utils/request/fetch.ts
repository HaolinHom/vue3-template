import { toast } from '@/components/utils/toast';
import { APP_BASE_URL } from '@/constants/env';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response, throwError } from './throwError';

const service = axios.create({
  // TIPS: 需要在环境变量文件内进行配置
  baseURL: APP_BASE_URL,
  timeout: 5000,
  // send cookies when cross-domain requests
  withCredentials: false,
  // headers: {
  // 	'Cache-Control': 'no-cache',
  // 	Pragma: 'no-cache'
  // }
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers || {};

    // TIPS: 按照项目需求，可自行修改
    //config.headers['Authorization'] = '';

    // 报错时是通过 toast 提示
    config.toast = config.hasOwnProperty('toast') ? config.toast : true;
    // toast 的内容是否强制使用接口返回的message
    config.toastResMsg = config.toastResMsg || false;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response.data;
    if (!res.success) {
      if (response.config?.toast) {
        toast(res.message);
      }
      // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
      return Promise.reject(response);
    } else {
      // 注意返回值
      return response.data;
    }
  },
  (error: AxiosError) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)';
          break;
        case 401:
          error.message = '未授权,请登录(401)';
          break;
        case 403:
          error.message = '拒绝访问(403)';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 405:
          error.message = '请求方法未允许(405)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器内部错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接错误: ${error.message}`;
      }
    } else {
      if (error.message == 'Network Error') {
        error.message = '网络异常，请检查后重试！';
      }
      error.message = '连接到服务器失败，请联系管理员';
    }

    if (error?.response?.config?.toastResMsg) {
      // @ts-ignore
      error.message = error?.response?.data?.message || error.message;
    }

    if (error?.response?.config?.toast) {
      toast(error.message);
    }

    return Promise.reject(error);
  },
);

async function fetch(config: AxiosRequestConfig) {
  return await service.request(config).catch((error: AxiosError) => {
    console.log('* error: ', error, config);
    throwError(error.response as unknown as Response);
  });
}

export default fetch;
