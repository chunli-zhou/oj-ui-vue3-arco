import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

// 创建axios的实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
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
    if (!res.code) {
      return;
    }
    if (res.code !== 200) {
      if (
        [40001].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.warning({
          bodyStyle: {
            textAlign: 'center'
          },
          title: '请先登录',
          content: '如需继续操作，请先登录',
          cancelText: '取消',
          okText: '登录',
          hideCancel: false,
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          },
          async onCancel() {
            return;
          }
        });
        return;
      }
      Message.error({
        content: res.message || '网络错误',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || '网络错误'));
    }
    return response;
  },
  error => {
    Message.error({
      content: error.message || '网络错误请稍后重试',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
