import request from '@/utils/request.js'
import API from '@/consts/api.js'

const roleService = {
    getRoleInfo() {
        return request.get(API.roleInfo)
    },
    deleteRole(id) {
        const url = API.roleAction.replace(':id', id)
        return request.delete(url)
    }

}

export default roleService