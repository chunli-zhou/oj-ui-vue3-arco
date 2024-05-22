import { defineStore } from 'pinia';

const useSignInStore = defineStore('signIn', {
  state: () => {
    return {
      signInFlag: false
    };
  },

  getters: {},

  actions: {},
  // 开启数据持久化
  persist: true
});
export default useSignInStore;
