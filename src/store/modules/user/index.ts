import { defineStore } from 'pinia';
import { clearToken, setToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import type { LoginRequest, RegisterRequest } from '@/api/gen-api';
import {
  LoginService,
  type SysUserResponse,
  SysUserService
} from '@/api/gen-api';

const useUserStore = defineStore('user', {
  state: (): SysUserResponse => ({
    id: undefined,
    username: undefined,
    realName: undefined,
    avatar: undefined,
    gender: undefined,
    email: undefined,
    mobile: undefined,
    status: undefined,
    role: ''
  }),

  getters: {
    userInfo(state: SysUserResponse): SysUserResponse {
      return { ...state };
    }
  },

  actions: {
    switchRoles() {
      return new Promise(resolve => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<SysUserResponse>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await SysUserService.getInfo(this.id);

      this.setInfo(res.result);
    },

    // Login
    async login(loginForm: LoginRequest) {
      try {
        const res = await LoginService.login(loginForm);
        this.id = res.result.userId;
        setToken(res.result.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    async register(registerForm: RegisterRequest) {
      await LoginService.register(registerForm);
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
    // Logout
    async logout() {
      try {
        await LoginService.logout();
      } finally {
        this.logoutCallBack();
      }
    }
  },
  // 开启数据持久化
  persist: true
});

export default useUserStore;
