import request from '@/utils/request.js'
import API from '@/consts/api.js'

const classifyService = {
    getAllClassify() {
        return request.get(API.classify)
    }
}

export default classifyService