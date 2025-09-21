import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
  },
  getters: {
    getUserInfo: (state) => state.userInfo,
  },
});

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    }),
  },
});
