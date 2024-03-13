import request from '@/utils/request.js'
import API from '@/consts/api.js'

const roleService = {
    getRoleInfo() {
        return request.get(API.roleInfo)
    }
}

export default roleService