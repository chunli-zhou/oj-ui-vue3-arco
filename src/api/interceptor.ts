import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

// 创建axios的实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
      Message.error({
        content: res.message || '网络错误',
        duration: 5 * 1000
      });
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: '登录信息已过期',
          content: '登录信息已过期，请重新登录',
          okText: '去登录',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          }
        });
      }
      return Promise.reject(new Error(res.message || '网络错误'));
    }
    return res;
  },
  error => {
    Message.error({
      content: error.message || '网络错误请稍后重试',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

// 封装 get 方法
const get: <Result>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig
) => Promise<Result> = async (url, params, config) => {
  return await service.get(url, { params, ...config });
};

// 封装 post 方法
const post: <Result>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<Result> = async (url, data = {}, config = {}) => {
  return await service.post(url, data, { ...config });
};

// 封装 put 方法
const put: <Result>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<Result> = async (url, data = {}, config = {}) => {
  return await service.put(url, data, { ...config });
};

// 封装 delete 方法
const _delete: <Result>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<Result> = async (url, config = {}) => {
  const response = await service.delete(url, config);
  return response.data;
};

// 使用 request 统一调用，包括封装的get、post、put、delete等方法
const request = { get, post, put, delete: _delete };

export default request;
