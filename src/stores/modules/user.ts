import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {

    } as API.UserInfo
  }),
  getters: {
    accessToken: (state) => state.userInfo.accessToken
  },
  actions: {
    /**
     * @function 设置用户信息
     * @param data 需要设置的用户信息
     */
    setUserInfo(data: API.UserInfo) {
      this.userInfo = {
        ...this.userInfo,
        ...data
      }
    }
  },
  persist: true,
})
