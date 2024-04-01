import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      userInfo: null,
      permissions: []
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo

      console.log("更新用户信息:", this.userInfo);

    },
    setPermissions(permissions) {
      this.permissions = permissions

      

      console.log("更新权限信息:", this.permissions);



    }
  }
})

export default useStore
