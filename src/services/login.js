import request from '@/utils/request.js'
import API from '@/consts/api.js'

const loginService = {
    sendSms: (phoneNumber) => {
        return request.post(API.sendAliyunSms, { send_phone: phoneNumber })
        
    },
    login: () => {
        return request.post(API.login)
    }
}

export default loginService