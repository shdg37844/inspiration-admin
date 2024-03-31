import request from '@/utils/request.js'
import API from '@/consts/api.js'

const userService = {
  getUserInfo() {
    return request.get(API.userInfo)
  },
  getAllUsers() {
    return request.get(API.users)
  },
  addUserRoles(name, phone, roles) {
    return request.post(API.user_roles, { name, phone, roles })
  },
  deleteUserRoles(id) {
    const url = API.UseRroleBind.replace(':id', id)
    return request.delete(url)
  },
  showSelectedUser(id) {
    const url = API.selectedUser.replace(':id', id)
    return request.get(url)
  },
  updateSelectedUser(id, name, phone, roles) {
    const url = API.selectedUser.replace(':id', id)
    return request.put(url, { name, phone, roles })
  },
}

export default userService
