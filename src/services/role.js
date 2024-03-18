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
    createRole(roleName) {
        return request.post(API.roleInfo, roleName)
    },
    createRolePermissions(submitData) {
        const url = API.RolePermissions.replace(':id', submitData.id)
        return request.post(url, submitData)
    },

}

export default roleService