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

    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    hasPermission(requiredPermission) {
      return this.permissions.includes(requiredPermission);
    }
  }
})

export default useStore
