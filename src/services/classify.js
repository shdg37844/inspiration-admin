import request from '@/utils/request.js'
import API from '@/consts/api.js'

const classifyService = {
    getAllClassify() {
        return request.get(API.classify)
    },

    getParentClassify() {
        return request.get(API.parent_classify)
    },

    createClassify(name, parent_id) {
        return request.post(API.classify, { name, parent_id })
    },

    deleteClassify(id) {
        const url = API.selectedClassify.replace(':id', id)
        return request.delete(url)
    }
}

export default classifyService