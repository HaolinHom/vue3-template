import { MainState } from './types';

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    isLogin: false,
  }),
  actions: {
    async appInitialize() {},
    async login() {},
    async logout() {},
  },
});
