import request from '@/utils/request.js'
import API from '@/consts/api.js'

const permissionService = {
  permissions: () => {
    return request.get(API.permissions)
  },
  getAllPermissions() {
    return request.get(API.allPermissions)
  },
  getCurrentRolePermissions(id) {
    const url = API.RolePermissions.replace(':id', id)
    return request.get(url)
  }
}

export default permissionService
