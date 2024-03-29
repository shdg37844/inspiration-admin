import request from '@/utils/request.js'
import API from '@/consts/api.js'

const roleService = {
    getRoleInfo() {
        return request.get(API.roleInfo)
    },
    deleteRole(id) {
        const url = API.roleAction.replace(':id', id)
        return request.delete(url)
    },
    createRole(roleName, permissions) {
        return request.post(API.roleInfo, { name: roleName, permissions: permissions })
    },
    getCurrentRole(id) {
        const url = API.roleAction.replace(':id', id)
        return request.get(url)
    },
}

export default roleService