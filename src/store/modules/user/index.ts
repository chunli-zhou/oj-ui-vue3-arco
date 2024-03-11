import { defineStore } from 'pinia';
import {
  getUserInfo,
  login as userLogin,
  type LoginData,
  logout as userLogout,
  register as userRegister,
  type RegisterData
} from '@/api/user';
import { clearToken, setToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import type { UserInfo } from './types';

const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    id: undefined,
    username: undefined,
    avatar: undefined,
    gender: undefined,
    email: undefined,
    mobile: undefined,
    role: ''
  }),

  getters: {
    userInfo(state: UserInfo): UserInfo {
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
    setInfo(partial: Partial<UserInfo>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.result);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.result.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    async register(registerForm: RegisterData) {
      await userRegister(registerForm);
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    }
  }
});

export default useUserStore;
