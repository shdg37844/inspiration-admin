import request from '@/utils/request.js'
import API from '@/consts/api.js'

const userService = {
  getUserInfo() {
    return request.get(API.userInfo)
  },
  getUsers() {
    return request.get(API.users)
  }
}

export default userService
